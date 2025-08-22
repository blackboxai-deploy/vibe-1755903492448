/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['localhost', 'example.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Intentional build issue: invalid webpack configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/nonexistent': '/path/that/does/not/exist',
    }
    
    // Another issue: trying to use undefined variable
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.UNDEFINED_VAR': JSON.stringify(undefinedVariable),
      })
    )
    
    return config
  },
  env: {
    CUSTOM_KEY: process.env.MISSING_ENV_VAR,
    API_URL: 'http://localhost:3001/api',
  },
  redirects: async () => {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
  rewrites: async () => {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'http://nonexistent-server.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig