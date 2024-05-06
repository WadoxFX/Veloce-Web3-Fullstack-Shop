import { profile as getProfileData } from '@/api/auth'
import { atom, selector } from 'recoil'

export const gender = atom<string | null>({
  key: 'gender',
  default: null,
})

export const profile = atom<UserProfile | null>({
  key: '',
  default: undefined,
})

export const fetchProfile = selector<UserProfile | {}>({
  key: 'fetchProfile',
  get: async ({ get }) => {
    try {
      const res = await getProfileData()
      return res.data as UserProfile
    } catch (error) {
      console.error('Error fetching profile:', error)
      return {}
    }
  },
})

export const filterAsideState = atom<FilterAsideState>({
  key: 'filterAsideState',
  default: {
    isOn: false,
    delay: false,
  },
})

export const filters = atom<FiltersList>({
  key: 'filters',
  default: {},
})

export const basketProducts = atom<BasketProducts>({
  key: 'basketProducts',
  default: [],
})
