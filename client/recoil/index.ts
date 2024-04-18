import { atom } from 'recoil'

export const gender = atom<string | null>({
  key: 'gender',
  default: null,
})

export const profile = atom({
  key: '',
  default: null,
})
