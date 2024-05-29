'use client'

import Link from 'next/link'

import { UserIcon } from '../icons'

const Account = () => (
  <Link data-test-id='user_icon' href='/profile' aria-label='Your account'>
    <UserIcon size={24} />
  </Link>
)

export default Account
