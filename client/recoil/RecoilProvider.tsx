'use client'

import React from 'react'

import { RecoilRoot } from 'recoil'

const RecoilProvider: React.FC<Children> = ({ children }) => <RecoilRoot>{children}</RecoilRoot>

export default RecoilProvider
