type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig }

type GetProductConfig = AxiosRequestConfig
type GetUserConfig = AxiosRequestConfig

interface GetParams {
  id: string
}

interface GetUserId {
  userId: string
}

type GetProductAndUserIds = GetUserId & {
  productId: string
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
