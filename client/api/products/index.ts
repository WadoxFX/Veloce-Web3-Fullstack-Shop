import { api } from '../instance'

export const createProduct = ({ params, config }: AxiosRequestConfig<FormData>) =>
  api.post<Product>('products/create', params, config)

export const addInFavorite = ({ params, config }: AxiosRequestConfig<GetProductAndUserIds>) =>
  api.put<ReqStatus>('products/addInFavorite', params, config)

export const removeFromFavorites = ({ params, config }: AxiosRequestConfig<GetProductAndUserIds>) =>
  api.put<ReqStatus>('products/removeFromFavorites', params, config)

export const getProducts = (requestConfig?: GetProductConfig) =>
  api.get<Products>('products', requestConfig?.config)

export const getNewProducts = (requestConfig?: GetProductConfig) =>
  api.get<Products>('products/new/list', requestConfig?.config)

export const getProduct = ({ params, config }: AxiosRequestConfig<GetParams>) =>
  api.get<Product>(`products/${params.id}`, config)

export const addComment = ({ params, config }: AxiosRequestConfig<CommentSchema>) =>
  api.put('products/addComment', params, config)

export const deleteComment = ({ params, config }: AxiosRequestConfig<deleteComment>) =>
  api.put('products/deleteComment', params, config)

export const getLikedProducts = ({ params, config }: AxiosRequestConfig<{ token: string }>) =>
  api.get<LikedProducts>(`products/liked/list?token=${params.token}`, config)
