import React from 'react'

import style from '../profile.module.scss'

const Profile: React.FC<Params> = ({ params: { id } }) => (
  <div className={style.content}>
    <div>user #{id}</div>
  </div>
)

export default Profile
