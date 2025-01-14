import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',  // Enables static exports
  basePath: '/workout-tracker', // Replace with your repo name
  images: {
    unoptimized: true
  },
}

export default nextConfig