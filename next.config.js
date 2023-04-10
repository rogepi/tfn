/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.ipfscdn.io',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.thirdwebcdn.com',
      },
    ],
  },
}

module.exports = nextConfig
