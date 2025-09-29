/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Add this if your GitHub Pages URL is username.github.io/repository-name
  // basePath: '/your-repository-name',
  // assetPrefix: '/your-repository-name/',
  };

export default nextConfig;
