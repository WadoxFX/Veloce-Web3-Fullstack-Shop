import { TAboutMeSchema } from '@/@types/zod'
import { api } from '../instance'

export const editProfile = ({ params, config }: AxiosRequestConfig<TAboutMeSchema & GetUserId>) =>
  api.put('users/edit', params, config)
