import { api } from '../instance'

export const createProduct = ({ params, config }: AxiosRequestConfig<FormData>) => {
  return api.post('products/create', params, config)
}

export const getProducts = (requestConfig?: GetProductConfig) =>
  api.get<Products>('products', requestConfig?.config)

export const getNewProducts = (requestConfig?: GetProductConfig) =>
  api.get<Products>('products/new/list', requestConfig?.config)

export const getProduct = ({ params, config }: AxiosRequestConfig<GetParams>) =>
  api.get<Product>(`products/${params.id}`, config)
