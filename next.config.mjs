/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/nicksal21.github.io',
  assetPrefix: '/nicksal21.github.io/',
  };

export default nextConfig;
