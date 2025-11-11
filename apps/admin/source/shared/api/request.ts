import { tokenStorage } from '@shared/store/tokenStorage'
import axios, { type AxiosRequestConfig, type Method } from 'axios'

interface BaseResponse<T> {
  success: boolean
  message: string
  data: T
}

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
  const token = tokenStorage.getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const sendRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axiosInstance.request<BaseResponse<T>>(config)

    if (!response.data.success) {
      throw new Error(
        response.data.message || '요청 처리 중 오류가 발생했습니다.',
      )
    }

    return response.data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          `HTTP ${error.response?.status}: ${error.message}`,
      )
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
