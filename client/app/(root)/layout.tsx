import Header from '@/components/header/Header'
import RecoilProvider from '@/recoil/RecoilProvider'

const HomeLayout = ({ children }: Children) => (
  <RecoilProvider>
    <Header />
    <main>{children}</main>
  </RecoilProvider>
)

export default HomeLayout
