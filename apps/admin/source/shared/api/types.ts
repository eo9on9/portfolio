export interface BaseResponse<T = unknown> {
  code: string
  message: string
  data: T
}
