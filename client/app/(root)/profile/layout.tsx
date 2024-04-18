import Sidebar from '@/components/sidebar/Sidebar'

import style from './profile.module.scss'

const ProfileLayout = ({ children }: Children) => (
  <div className={style.container}>
    <Sidebar />
    {children}
  </div>
)

export default ProfileLayout
