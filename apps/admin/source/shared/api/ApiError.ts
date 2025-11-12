import { AxiosError, AxiosResponse } from 'axios'
import { BaseResponse } from './types'

export class ApiError extends Error {
  readonly code?: string
  readonly response?: AxiosResponse<BaseResponse>

  constructor(
    code?: string,
    message?: string,
    response?: AxiosResponse<BaseResponse>,
  ) {
    super(message)
    this.code = code
    this.response = response
  }

  static from(error: AxiosError) {
    let code = error.code
    let message = error.message

    if (error.response) {
      const { data } = error.response as AxiosResponse<BaseResponse>

      code = data.code
      message = data.message
    }

    return new ApiError(
      code,
      message,
      error.response as AxiosResponse<BaseResponse>,
    )
  }
}
