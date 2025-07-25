

"use client";

import type { FullPokemonData } from '@/types/pokemon';
import PokemonCard from '@/components/pokemon/PokemonCard';


interface PokemonDashboardProps {
  pokemons: FullPokemonData[];
}


export default function PokemonDashboard({ pokemons }: PokemonDashboardProps) {
  return (
    <div className=" min-h-screen pt-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {pokemons.map((pokemon) => (
            <PokemonCard 
              key={pokemon.id} 
              pokemon={pokemon}
           
            />
          ))}
        </div>
      </div>
    </div>
  );
}
