import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp', 'archiver', 'unzipper', 'xlsx'],
};

export default nextConfig;
