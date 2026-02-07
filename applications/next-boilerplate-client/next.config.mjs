/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@shared/types'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
