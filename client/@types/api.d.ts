type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig }

type GetProductConfig = AxiosRequestConfig
type GetUserConfig = AxiosRequestConfig

interface GetParams {
  id: string
}

interface GetAuthToken {
  token: string
}

interface GetUserId {
  userId: string
}

type GetProductAndUserIds = GetUserId & {
  productId: string
}

interface GetOrderParams {
  productIds: string[]
  paid?: boolean
  city: string
  method: string
  price: number
  phone: string
  surname: string
  username: string
  address?: string
  orderId?: number
}

interface ReqStatus {
  success: boolean
}

interface AuthData {
  username: string
  surname: string
  email: string
  password: string
}

type LoginData = Omit<AuthData, 'username' | 'surname'>

interface GetOrderId {
  orderId: string
}
