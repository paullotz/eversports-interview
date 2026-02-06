/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@shared/types'],
  images: {
    domains: ['avatars.githubusercontent.com', 'cloudflare-ipfs.com'],
  },
}

export default nextConfig
