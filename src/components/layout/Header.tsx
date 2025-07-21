// src/components/layout/Header.tsx

import Link from 'next/link';
import Image from 'next/image';

// Componente funcional simples para o cabeçalho
export default function Header() {
  return (
    <header className="w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="px-10 py-3 flex items-center justify-between">
        {/* 1. IMAGEM À ESQUERDA QUE LEVA AO MENU INICIAL */}
        <Link href="/" className="flex items-center gap-3">
            {/* 2. LOGO DO POKÉMON */}

          <Image
            src="/pokebola.png" 
            alt="Logo do Pokémon Dashboard"
            width={40} 
            height={40}
            className="hover:rotate-[360deg] transition-transform duration-500"
          />
          <span className="text-xl font-bold text-white hidden sm:block">
            Pokémon Dashboard
          </span>
        </Link>

        {/* Espaço à direita para futuros links, como "Sobre" ou "Contato" */}
        
        <nav>
          {/* <Link href="/sobre" className="text-gray-300 hover:text-yellow-400">Sobre</Link> */}
        </nav>
      </div>
    </header>
  );
}
