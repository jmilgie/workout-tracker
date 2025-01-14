import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  
  output: 'export',  // Enables static exports
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true
  },
}

export default nextConfig