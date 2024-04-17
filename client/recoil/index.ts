import { atom } from 'recoil'

export const gender = atom<string | null>({
  key: 'gender',
  default: null,
})
