// src/app/page.tsx

import fs from 'fs/promises';
import path from 'path';
import PokemonDashboard from '@/components/dashboard/PokemonDashboard';
import type { FullPokemonData } from '@/types/pokemon';

// Função que busca os dados no servidor
async function getFullPokemonData(): Promise<FullPokemonData[]> {
  const filePath = path.join(process.cwd(), 'data', 'pokemon-data-full.json');

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error("Erro ao ler o arquivo de dados dos Pokémon:", error);
    throw new Error('Falha ao carregar os dados dos Pokémon. Verifique se o arquivo "data/pokemon-data-full.json" existe.');
  }
}

// Componente principal da página
export default async function HomePage() {
  const allPokemons = await getFullPokemonData();
  return <PokemonDashboard initialPokemons={allPokemons} />;
}
