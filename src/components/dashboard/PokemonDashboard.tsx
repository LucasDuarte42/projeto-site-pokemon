// src/components/dashboard/PokemonDashboard.tsx

"use client";

// 1. REMOVIDO: Não precisamos mais de 'useState' ou 'useMemo' aqui,
// pois não há filtros interativos neste componente.
// import { useState, useMemo } from 'react';

// A importação do tipo e do card continuam necessárias.
import type { FullPokemonData } from '@/types/pokemon';
import PokemonCard from '@/components/pokemon/PokemonCard';

// A interface de props continua a mesma.
interface PokemonDashboardProps {
  initialPokemons: FullPokemonData[];
}

export default function PokemonDashboard({ initialPokemons }: PokemonDashboardProps) {
  return (
    // 3. MODIFICADO: O layout foi simplificado.
    // 'container mx-auto' cria um contêiner de largura fixa e o centraliza.
    // 'px-6' adiciona um padding nas laterais para telas menores.
    // 'py-10' adiciona um espaçamento vertical no topo e na base.
    <div className="bg-gray-900 min-h-screen">
      
      {/* 4. REMOVIDO: A tag <aside> e a tag <main> foram removidas por não serem mais necessárias
          nesta estrutura simples. O div acima já serve como contêiner principal. */}

      {/* O grid de Pokémon agora é o elemento principal. */}
      <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* 
          Agora estamos mapeando diretamente a lista 'initialPokemons'
          que o componente recebe, sem nenhuma filtragem.
        */}
        {initialPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        </div>
      </div>
    </div>
  );
}



