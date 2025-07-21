// src/types/pokemon.ts

// Centralizamos todas as interfaces relacionadas a Pokémon aqui.
// Assim, qualquer componente pode importá-las de um único lugar.

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
}

export interface PokemonAbility {
  name: string;
  is_hidden: boolean;
  slot: number;
}

export interface PokedexEntry {
  version: string;
  text: string;
}

export interface FullPokemonData {
  id: number;
  name: string;
  species_id: number;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  is_default: boolean;
  generation: number;
  is_legendary: boolean;
  is_mythical: boolean;
  is_baby: boolean;
  capture_rate: number;
  base_happiness: number;
  growth_rate_id: number;
  color: string;
  stats: PokemonStats;
  types: string[];
  abilities: PokemonAbility[];
  egg_groups: string[];
  gender_rate: number;
  evolution_chain_id: number | null;
  evolves_from_species_id: number | null;
  pokedex_entries: PokedexEntry[];
  imageUrl: string;
}
