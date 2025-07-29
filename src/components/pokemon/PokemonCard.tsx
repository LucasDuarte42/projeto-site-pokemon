
import Image from 'next/image';
import type { FullPokemonData, PokemonStats } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: FullPokemonData;
}

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
      case 'Grass': return 'bg-green-500 text-white';
      case 'Fire': return 'bg-red-600 text-white';
      case 'Water': return 'bg-blue-500 text-white';
      case 'Bug': return 'bg-lime-500 text-black';
      case 'Normal': return 'bg-gray-400 text-black';
      case 'Poison': return 'bg-purple-600 text-white';
      case 'Electric': return 'bg-yellow-400 text-black';
      case 'Ground': return 'bg-amber-700 text-white';
      case 'Fairy': return 'bg-pink-400 text-black';
      case 'Fighting': return 'bg-orange-800 text-white';
      case 'Psychic': return 'bg-pink-600 text-white';
      case 'Rock': return 'bg-stone-500 text-white';
      case 'Ghost': return 'bg-indigo-700 text-white';
      case 'Ice': return 'bg-cyan-300 text-black';
      case 'Dragon': return 'bg-indigo-500 text-white';
      case 'Dark': return 'bg-gray-800 border border-white text-white';
      case 'steel': return 'bg-slate-400 text-black';
      case 'Flying': return 'bg-sky-400 text-black';
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
