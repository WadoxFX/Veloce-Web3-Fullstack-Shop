import { api } from '../instance'

export const createProduct = ({ params, config }: AxiosRequestConfig<FormData>) => {
  return api.post('products/create', params, config)
}
