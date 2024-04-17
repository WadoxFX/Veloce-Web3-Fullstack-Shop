import RecoilProvider from '@/recoil/RecoilProvider'

const HomeLayout = ({ children }: Children) => (
  <RecoilProvider>
    <main>{children}</main>
  </RecoilProvider>
)

export default HomeLayout
