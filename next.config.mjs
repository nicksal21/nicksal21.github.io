/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isProd
    ? {
        basePath: '/nicksal21.github.io',
        assetPrefix: '/nicksal21.github.io/',
      }
    : {}),
};

export default nextConfig;
