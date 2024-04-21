type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig }

type GetProductConfig = AxiosRequestConfig

interface GetParams {
  id: string
}
