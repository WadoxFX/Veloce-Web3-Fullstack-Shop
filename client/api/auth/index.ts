import { api } from '../instance'

export const login = ({
  params,
  config,
}: AxiosRequestConfig<Omit<AuthData, 'username' | 'surname'>>) => {
  api.post<User>('auth/login', params, config)
}

export const signUp = ({ params, config }: AxiosRequestConfig<AuthData>) => {
  api.post<User>('auth/signup', params, config)
}

export const profile = (requestConfig?: GetUserConfig) =>
  api.get<UserProfile>('auth/profile', requestConfig?.config)
