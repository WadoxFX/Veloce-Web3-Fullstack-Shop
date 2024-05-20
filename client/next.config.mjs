/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: 'http://localhost:8080/',
    CONTRACT_URL: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  },
  images: { domains: ['localhost', '192.168.1.4'] },
}

export default nextConfig
