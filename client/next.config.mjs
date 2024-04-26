/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: 'http://192.168.1.4:8080/' || 'http://localhost:3000'
  },
  images: { domains: ['localhost', '192.168.1.4'] },
}

export default nextConfig
