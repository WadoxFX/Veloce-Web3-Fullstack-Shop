/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: 'http://localhost:8080/',
    CONTRACT_URL: 'Youre contract url',
  },
  images: { domains: ['localhost', '192.168.1.4'] },
}

export default nextConfig
