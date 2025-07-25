

"use client";

import { useState, useMemo, useEffect } from 'react';
import PokemonDashboard from '@/components/dashboard/PokemonDashboard';
import Header from '@/components/layout/Header';
import type { FullPokemonData } from '@/types/pokemon';

async function getFullPokemonData(): Promise<FullPokemonData[]> {
  const res = await fetch('/pokemon-data-full.json');
  if (!res.ok) {
    throw new Error('Falha ao buscar dados dos Pokémon');
  }
  return res.json();
}

export default function HomePage() {
  const [allPokemons, setAllPokemons] = useState<FullPokemonData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isLoading, setIsLoading] = useState(true); 

  const [selectedType, setSelectedType] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');

  useEffect(() => {
    getFullPokemonData()
      .then(data => {
        setAllPokemons(data);
      })
      .catch(error => {
        console.error("Erro ao buscar os dados:", error); 
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []);

  const filteredPokemons = useMemo(() => {
    let pokemonsToFilter = allPokemons || [];

    if (searchTerm) {
      pokemonsToFilter = pokemonsToFilter.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      pokemonsToFilter = pokemonsToFilter.filter(p =>
        p.types.includes(selectedType.toLowerCase())
      );
    }
    if (selectedGeneration) {
      pokemonsToFilter = pokemonsToFilter.filter(p =>
        p.generation === parseInt(selectedGeneration, 10)
      );
    }

   return pokemonsToFilter;
  }, [allPokemons, searchTerm, selectedType, selectedGeneration]);
  
    
  const allTypes = useMemo(() => {
    const types = new Set(allPokemons.flatMap(p=> p.types));
    return Array.from(types).sort();
  }, [allPokemons]);
  const allGenerations = useMemo(() => {
    const generations = new Set(allPokemons.map(p => p.generation));
    return Array.from(generations).sort((a, b) => a - b);
  }, [allPokemons]);

  return (
    <>
      <Header 
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}

        types={allTypes}
        selectedType={selectedType}
        onTypeChange={(e) => setSelectedType(e.target.value)}

        generations={allGenerations}
        selectedGeneration={selectedGeneration}
        onGenerationChange={(e) => setSelectedGeneration(e.target.value)}
      />

      {isLoading ? (
       
        <div className="h-screen flex-grow flex justify-center items-center ">
         
          <img 
            src="/loading.gif" 
            alt="Carregando..."
            className="w-24 h-24" 
          />
        </div>
      ) : (
        <div className='flex-grow'>
          <PokemonDashboard pokemons={filteredPokemons} />
        </div>
    )}
    </>
  );
}