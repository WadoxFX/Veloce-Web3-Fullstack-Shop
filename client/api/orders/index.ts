import { api } from '../instance'

export const createNewOrder = async ({ params, config }: AxiosRequestConfig<GetOrderParams>) =>
  api.post('orders/create', params, config)
