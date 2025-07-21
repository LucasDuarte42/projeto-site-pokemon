// src/components/pokemon/PokemonCard.tsx

import Image from 'next/image';
// Importamos os tipos para que o componente saiba qual o formato dos dados que vai receber
import type { FullPokemonData, PokemonStats } from '@/types/pokemon';

// Definimos as props que o nosso card vai receber
interface PokemonCardProps {
  pokemon: FullPokemonData;
}

// Um pequeno componente auxiliar para formatar os nomes dos stats
const StatName: React.FC<{ stat: keyof PokemonStats }> = ({ stat }) => {
  const names = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defesa',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Velocidade',
  };
  return <span className="text-xs font-semibold">{names[stat] || stat}</span>;
};

// O componente principal do Card
export default function PokemonCard({ pokemon }: PokemonCardProps) {
  // Função para definir a cor da barra de status com base no valor
  const getStatColor = (value: number) => {
    if (value < 50) return 'bg-red-500';
    if (value < 90) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  const getTypeColors = (type: string): string => {
    const lowerCaseType = type.toLowerCase();
    switch (lowerCaseType) {
      case 'grass': return 'bg-green-500 text-white';
      case 'fire': return 'bg-red-600 text-white';
      case 'water': return 'bg-blue-500 text-white';
      case 'bug': return 'bg-lime-500 text-black';
      case 'normal': return 'bg-gray-400 text-black';
      case 'poison': return 'bg-purple-600 text-white';
      case 'electric': return 'bg-yellow-400 text-black';
      case 'ground': return 'bg-amber-700 text-white';
      case 'fairy': return 'bg-pink-400 text-black';
      case 'fighting': return 'bg-orange-800 text-white';
      case 'psychic': return 'bg-pink-600 text-white';
      case 'rock': return 'bg-stone-500 text-white';
      case 'ghost': return 'bg-indigo-700 text-white';
      case 'ice': return 'bg-cyan-300 text-black';
      case 'dragon': return 'bg-indigo-500 text-white';
      case 'dark': return 'bg-gray-800 border border-white text-white';
      case 'steel': return 'bg-slate-400 text-black';
      case 'flying': return 'bg-sky-400 text-black';
      default: return 'bg-gray-700 text-white';
    }
  };

  return (
    <div
      key={pokemon.id}
      className="bg-gray-800 p-4 rounded-lg text-center shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1 transition-all flex flex-col justify-between"
    >
      {/* Parte Superior do Card: Imagem e Nome */}
      <div>
        <Image
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
          width={128}
          height={128}
        />
        <h2 className="text-xl capitalize font-semibold mt-2 text-white ">{pokemon.name}</h2>
        
<div className="flex justify-center gap-2 mt-2">
  {pokemon.types.map(type => (
    <span 
      key={type} 
      className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${getTypeColors(type)}`}
    >
      {type}
    </span>
  ))}
</div>

      </div>

      {/* NOVO: Seção de Stats */}
      <div className="mt-4 pt-4 border-t border-gray-700/50 text-left">
        <h3 className="text-sm font-bold text-center mb-2 text-yellow-400">Base Stats</h3>
        <div className="space-y-2">
          {/* 
            Object.entries transforma o objeto de stats em um array de [chave, valor]
            Ex: [['hp', 45], ['attack', 49], ...]
            Isso nos permite fazer um .map() para renderizar cada stat.
          */}
          {(Object.entries(pokemon.stats) as [keyof PokemonStats, number][]).map(([statName, statValue]) => (
            <div key={statName} className="grid grid-cols-3 items-center gap-2 text-white">
              <StatName stat={statName} />
              <div className="col-span-2 bg-gray-700 rounded-full h-4">
                {/* Barra de progresso visual */}
                <div
                  className={`h-4 rounded-full text-black text-xs flex items-center justify-center font-bold ${getStatColor(statValue)}`}
                  style={{ width: `${(statValue / 255) * 100}%` }} // O valor máximo de um stat é 255
                >
                  {statValue}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
