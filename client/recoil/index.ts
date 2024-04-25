import { atom } from 'recoil'

export const gender = atom<string | null>({
  key: 'gender',
  default: null,
})

export const profile = atom<Profile | null>({
  key: '',
  default: null,
})

export const filters = atom<FiltersList>({
  key: 'filters',
  default: {},
})

export const basketProducts = atom<BasketProducts>({
  key: 'basketProducts',
  default: [],
})
