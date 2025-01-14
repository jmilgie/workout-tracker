import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  
  output: 'export',  // Enables static exports
  basePath: process.env.NODE_ENV === 'production' ? '/workout-tracker' : '',
  images: {
    unoptimized: true
  },
}

export default nextConfig