/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.thirdwebcdn.com',
      },
    ],
  },
}

module.exports = nextConfig
