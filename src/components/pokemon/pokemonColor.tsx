// src/utils/pokemonColors.ts

export const getTypeColors = (type: string): string => {
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
