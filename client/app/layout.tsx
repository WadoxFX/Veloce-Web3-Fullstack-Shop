import { Inter } from 'next/font/google'
import '@/styles/global.css'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: Children) => (
  <html lang='en'>
    <body className={inter.className}>{children}</body>
  </html>
)

export default RootLayout
