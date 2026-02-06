/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@shared/types'],
  images: {
    domains: ['avatars.githubusercontent.com', 'picsum.photos'],
  },
}

export default nextConfig
