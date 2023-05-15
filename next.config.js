/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/dlracnnpe/image/**/*',
      },
    ],
  },
  env: {},
  pageExtensions: ['tsx', 'ts'],
};

module.exports = nextConfig;
