// process-data.mjs
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const dataDir = path.join(process.cwd(), 'data');
const publicDir = path.join(process.cwd(), 'public');

const readCsv = (filename) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(dataDir, filename))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

async function processAndSaveData() {
  try {
    console.log('Iniciando processamento completo dos dados...');

    // 1. Ler todos os CSVs necessários
    const [
      pokemon, pokemonSpecies, pokemonStats, stats, pokemonTypes, types,
      pokemonAbilities, abilities, abilityProse, pokemonSpeciesProse,
      pokemonEvolution, pokemonEggGroups, eggGroups, pokemonColors
    ] = await Promise.all([
      readCsv('pokemon.csv'), readCsv('pokemon_species.csv'), readCsv('pokemon_stats.csv'),
      readCsv('stats.csv'), readCsv('pokemon_types.csv'), readCsv('types.csv'),
      readCsv('pokemon_abilities.csv'), readCsv('abilities.csv'), readCsv('ability_prose.csv'),
      readCsv('pokemon_species_prose.csv'), readCsv('pokemon_evolution.csv'),
      readCsv('pokemon_egg_groups.csv'), readCsv('egg_groups.csv'), readCsv('pokemon_colors.csv')
    ]);
    console.log('Todos os arquivos CSV foram lidos com sucesso.');

    // 2. Criar mapas para facilitar a busca (ID -> Data)
    const statMap = new Map(stats.map(s => [s.id, s.identifier]));
    const typeMap = new Map(types.map(t => [t.id, t.identifier]));
    const abilityMap = new Map(abilities.map(a => [a.id, { identifier: a.identifier, generation_id: a.generation_id }]));
    const eggGroupMap = new Map(eggGroups.map(eg => [eg.id, eg.identifier]));
    const colorMap = new Map(pokemonColors.map(c => [c.id, c.identifier]));

    // Agrupar dados que pertencem a um mesmo Pokémon para evitar buscas repetidas
    // Bloco Novo (corrigido)
const speciesProseMap = new Map();
pokemonSpeciesProse.filter(p => p.local_language_id === '9') // Apenas Inglês
  .forEach(p => {
    if (!speciesProseMap.has(p.pokemon_species_id)) {
      speciesProseMap.set(p.pokemon_species_id, []);
    }
    // AQUI ESTÁ A CORREÇÃO:
    // Verificamos se p.flavor_text existe. Se não, usamos uma string vazia ''.
    const flavorText = (p.flavor_text || '').replace(/\n/g, ' ');
    speciesProseMap.get(p.pokemon_species_id).push({ version: p.version_id, text: flavorText });
  });


    const abilitiesMap = new Map();
    pokemonAbilities.forEach(pa => {
        if (!abilitiesMap.has(pa.pokemon_id)) abilitiesMap.set(pa.pokemon_id, []);
        const abilityInfo = abilityMap.get(pa.ability_id);
        abilitiesMap.get(pa.pokemon_id).push({ 
            name: abilityInfo.identifier, 
            is_hidden: pa.is_hidden === '1',
            slot: parseInt(pa.slot, 10)
        });
    });

    const eggGroupsMap = new Map();
    pokemonEggGroups.forEach(peg => {
        if (!eggGroupsMap.has(peg.species_id)) eggGroupsMap.set(peg.species_id, []);
        eggGroupsMap.get(peg.species_id).push(eggGroupMap.get(peg.egg_group_id));
    });

    // 3. Juntar tudo em uma única estrutura
    const processedPokemon = pokemon.map(p => {
      const speciesInfo = pokemonSpecies.find(s => s.id === p.species_id);
      
      const pStats = pokemonStats
        .filter(ps => ps.pokemon_id === p.id)
        .reduce((acc, current) => {
          acc[statMap.get(current.stat_id)] = parseInt(current.base_stat, 10);
          return acc;
        }, {});

      const pTypes = pokemonTypes
        .filter(pt => pt.pokemon_id === p.id)
        .sort((a, b) => a.slot - b.slot)
        .map(pt => typeMap.get(pt.type_id));

      const pAbilities = (abilitiesMap.get(p.id) || []).sort((a, b) => a.slot - b.slot);
      const pEggGroups = eggGroupsMap.get(p.species_id) || [];
      const evolutionInfo = pokemonEvolution.find(e => e.id === speciesInfo?.evolution_chain_id);
      const pokedexEntries = speciesProseMap.get(p.species_id) || [];

      return {
        id: parseInt(p.id, 10),
        name: p.identifier,
        species_id: parseInt(p.species_id, 10),
        height: parseInt(p.height, 10) / 10, // em metros
        weight: parseInt(p.weight, 10) / 10, // em kg
        base_experience: parseInt(p.base_experience, 10),
        order: parseInt(p.order, 10),
        is_default: p.is_default === '1',
        
        // Dados da Espécie
        generation: parseInt(speciesInfo?.generation_id || '0', 10),
        is_legendary: speciesInfo?.is_legendary === '1',
        is_mythical: speciesInfo?.is_mythical === '1',
        is_baby: speciesInfo?.is_baby === '1',
        capture_rate: parseInt(speciesInfo?.capture_rate, 10),
        base_happiness: parseInt(speciesInfo?.base_happiness, 10),
        growth_rate_id: parseInt(speciesInfo?.growth_rate_id, 10),
        color: colorMap.get(speciesInfo?.color_id),
        
        // Dados de Batalha
        stats: pStats,
        types: pTypes,
        abilities: pAbilities,

        // Dados de Breeding
        egg_groups: pEggGroups,
        gender_rate: parseInt(speciesInfo?.gender_rate, 10), // -1 = sem gênero, 0 = 100% M, 8 = 100% F
        
        // Dados de Evolução
        evolution_chain_id: evolutionInfo ? parseInt(evolutionInfo.id, 10) : null,
        evolves_from_species_id: speciesInfo?.evolves_from_species_id ? parseInt(speciesInfo.evolves_from_species_id, 10) : null,

        // Dados Descritivos
        pokedex_entries: pokedexEntries,
        
        // URL da Imagem
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`
      };
    } );

    console.log(`Processamento completo para ${processedPokemon.length} Pokémon.`);

    // 4. Salvar o resultado como um arquivo JSON na pasta /public
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
    
    fs.writeFileSync(
      path.join(publicDir, 'pokemon-data-full.json'),
      JSON.stringify(processedPokemon, null, 2)
    );

    console.log('Dados completos salvos com sucesso em /public/pokemon-data-full.json!');

  } catch (error) {
    console.error('Erro ao processar os dados:', error);
  }
}

processAndSaveData();
