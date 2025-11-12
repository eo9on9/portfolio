import { AxiosError, AxiosResponse } from 'axios'
import { BaseResponse } from './types'

export class ApiError extends Error {
  readonly response?: AxiosResponse<BaseResponse>

  constructor(message?: string, response?: AxiosResponse<BaseResponse>) {
    super(message)
    this.response = response
  }

  static from(error: AxiosError) {
    const message = error.message
    const response = error.response as AxiosResponse<BaseResponse>

    return new ApiError(message, response)
  }
}
