import { api } from '../instance'

export const createNewOrder = async ({ params, config }: AxiosRequestConfig<GetOrderParams>) =>
  api.post<Promise<Order>>('orders/create', params, config)

export const deleteOrder = async ({ params }: AxiosRequestConfig<GetOrderId>) =>
  api.delete<Promise<void>>('orders/delete', { data: params })

export const getOrders = async (requestConfig?: GetProductConfig) =>
  api.get<Promise<Orders>>('orders', requestConfig?.config)
