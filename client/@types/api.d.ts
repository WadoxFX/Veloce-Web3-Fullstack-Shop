type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig }

type GetUsersConfig = AxiosRequestConfig

interface GetParams {
  id: string
}
