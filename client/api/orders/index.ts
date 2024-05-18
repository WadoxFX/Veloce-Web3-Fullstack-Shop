import { api } from '../instance'

export const createNewOrder = async ({ params, config }: AxiosRequestConfig<GetOrderParams>) =>
  api.post<Promise<Order>>('orders/create', params, config)
