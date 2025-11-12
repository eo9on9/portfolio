import { accessTokenStorage } from '@shared/store/accessTokenStorage'
import axios, { type AxiosRequestConfig, type Method } from 'axios'
import { ApiError } from './ApiError'
import { BaseResponse } from './types'

const BASE_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api'
    : '/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

axiosInstance.interceptors.request.use(config => {
  const accessToken = accessTokenStorage.get()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

const sendRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance.request<BaseResponse<T>>(config)

    return response.data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw ApiError.from(error)
    }

    throw error
  }
}

const createMethodRequest =
  (method: Method) =>
  <T>(url: string, config?: AxiosRequestConfig) =>
    sendRequest<T>({ url, method, ...config })

export const request = {
  get: createMethodRequest('GET'),
  post: createMethodRequest('POST'),
  put: createMethodRequest('PUT'),
  delete: createMethodRequest('DELETE'),
}
