/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_URL: 'http://localhost:8080/'
  },
  images: { domains: ['localhost'] },
}

export default nextConfig
