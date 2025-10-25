import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: path.resolve(process.cwd()),
    },
  },
  reactStrictMode: false, // só em DEV; pode voltar a true depois que estabilizar
};

export default nextConfig;
