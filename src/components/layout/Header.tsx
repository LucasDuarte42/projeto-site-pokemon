// src/components/layout/Header.tsx

import Link from 'next/link';
import Image from 'next/image';
import React from 'react'; // Importar React para o tipo ChangeEvent

// 1. DEFINIR AS PROPS QUE O HEADER VAI RECEBER
interface HeaderProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  // Props para o filtro de Tipo
  types: string[];
  selectedType: string;
  onTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  // Props para o filtro de Geração
  generations: number[];
  selectedGeneration: string;
  onGenerationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Header({ 
  searchTerm, onSearchChange,
  types, selectedType, onTypeChange,
  generations, selectedGeneration, onGenerationChange
}: HeaderProps) {
  return (
    <header className="w-full bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="mx-auto px-12 py-3 flex items-center justify-between gap-4">
        {/* Logo e Título */}
        <Link href="/" className="flex items-center text-white gap-3 flex-shrink-0">
          <Image
            src="/pokebola.png"
            alt="Logo"
            width={40}
            height={40}
            className="transition-transform duration-500 hover:rotate-360"
          />
          <span className="text-xl font-bold  hidden sm:block">
            Pokémon Dashboard
          </span>
        </Link>
        <div className="flex items-center gap-4 flex-grow justify-end ">
        {/* Filtros e Pesquisa */}
          <select 
            value={selectedType}
            onChange={onTypeChange}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition w-full sm:w-auto"
          >
            <option value="">Tipos</option>
            {types.map(type => (
              <option key={type} value={type} className="capitalize">{type}</option>
            ))}
          </select>

          {/* --- FILTRO DE GERAÇÃO --- */}
          <select 
            value={selectedGeneration}
            onChange={onGenerationChange}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition w-full sm:w-auto"
          >
            <option value="">Gerações</option>
            {generations.map(gen => (
              <option key={gen} value={gen}>Geração {gen}</option>
            ))}
          </select>
          </div>
          {/* --- CAMPO DE PESQUISA --- */}
        <div className="relative flex-grow max-w-xs">
          <input
            type="text"
            placeholder="Pesquisar Pokémon..."
            className="w-full bg-gray-700 border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </header>
  );
}
    
