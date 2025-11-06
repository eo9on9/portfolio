import axios, { type AxiosRequestConfig, type Method } from 'axios'

const BASE_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api'
    : '/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

const sendRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.request<T>(config)

  return response.data
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
