import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
  // Adicione esta seção para configurar os domínios de imagem permitidos
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**',
      },
    ],
  },
};


export default nextConfig;
