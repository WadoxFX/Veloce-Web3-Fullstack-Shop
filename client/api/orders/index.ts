import { api } from '../instance'

export const createNewOrder = async ({ params, config }: AxiosRequestConfig<GetOrderParams>) => {
  return api.post('orders/create', params, config)
}
