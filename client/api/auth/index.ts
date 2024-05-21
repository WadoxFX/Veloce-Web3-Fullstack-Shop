import { api } from '../instance'

export const login = async ({ params, config }: AxiosRequestConfig<LoginData>) => {
  return api.post<User>('auth/login', params, config)
}

export const signUp = async ({ params, config }: AxiosRequestConfig<AuthData>) => {
  return api.post<User>('auth/signup', params, config)
}

export const profile = async (requestConfig?: GetUserConfig) =>
  api.get<UserProfile>('auth/profile', requestConfig?.config)

export const profileByToken = async ({ params, config }: AxiosRequestConfig<GetAuthToken>) =>
  api.get<UserProfile>(`auth/profile?token=${params.token}`, config)
