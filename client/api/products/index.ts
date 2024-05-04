import { api } from '../instance'

export const createProduct = ({ params, config }: AxiosRequestConfig<FormData>) => {
  return api.post<Product>('products/create', params, config)
}

export const addInFavorite = ({ params, config }: AxiosRequestConfig<GetProductAndUserIds>) => {
  return api.put<ReqStatus>('products/addInFavorite', params, config)
}

export const removeFromFavorites = ({ params, config }: AxiosRequestConfig<GetProductAndUserIds>) => {
  return api.put<ReqStatus>('products/removeFromFavorites', params, config)
}

export const getProducts = (requestConfig?: GetProductConfig) =>
  api.get<Products>('products', requestConfig?.config)

export const getNewProducts = (requestConfig?: GetProductConfig) =>
  api.get<Products>('products/new/list', requestConfig?.config)

export const getProduct = ({ params, config }: AxiosRequestConfig<GetParams>) =>
  api.get<Product>(`products/${params.id}`, config)

export const getLikedProducts = ({ params, config }: AxiosRequestConfig<{ token: string }>) =>
  api.get<LikedProducts>(`products/liked/list?token=${params.token}`, config)
