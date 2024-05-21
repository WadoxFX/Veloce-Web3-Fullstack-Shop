import { api } from '../instance'

export const createProduct = async ({ params, config }: AxiosRequestConfig<FormData>) => {
  return api.post<Product>('products/create', params, config)
}

export const addInFavorite = async ({ params, config }: AxiosRequestConfig<GetProductAndUserIds>) => {
  return api.put<ReqStatus>('products/addInFavorite', params, config)
}

export const removeFromFavorites = async ({ params, config }: AxiosRequestConfig<GetProductAndUserIds>) => {
  return api.put<ReqStatus>('products/removeFromFavorites', params, config)
}

export const addComment = async ({ params, config }: AxiosRequestConfig<CommentSchema>) => {
  return api.put('products/addComment', params, config)
}

export const deleteComment = async ({ params, config }: AxiosRequestConfig<deleteComment>) => {
  return api.put('products/deleteComment', params, config)
}

export const getLikedProducts = async ({ params, config }: AxiosRequestConfig<{ token: string }>) =>
  api.get<LikedProducts>(`products/liked/list?token=${params.token}`, config)

export const getProducts = async (requestConfig?: GetProductConfig) =>
  api.get<Products>('products', requestConfig?.config)

export const getNewProducts = async (requestConfig?: GetProductConfig) =>
  api.get<Products>('products/new/list', requestConfig?.config)

export const getProduct = async ({ params, config }: AxiosRequestConfig<GetParams>) =>
  api.get<Product>(`products/${params.id}`, config)
