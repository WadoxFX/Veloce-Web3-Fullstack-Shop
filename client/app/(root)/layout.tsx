import type { Metadata } from 'next'

import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import RecoilProvider from '@/recoil/RecoilProvider'

export const metadata: Metadata = {
  title: 'Veloce',
  keywords: 'Veloce, company, sneakers, shoes, sports, sports shoe store,',
  description: 'Veloce - We are a company selling sports shoes',
}

const HomeLayout = ({ children }: Children) => (
  <RecoilProvider>
    <Header />
    <main>{children}</main>
    <Footer />
  </RecoilProvider>
)

export default HomeLayout
