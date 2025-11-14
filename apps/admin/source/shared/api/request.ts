import { accessTokenStorage } from '@shared/store/accessTokenStorage'
import axios, {
  AxiosError,
  AxiosResponse,
  type AxiosRequestConfig,
  type Method,
} from 'axios'
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

const refreshTokenApi = async () => {
  const response = await axios.post<BaseResponse<{ accessToken: string }>>(
    '/api/auth/refresh',
    {},
    { withCredentials: true },
  )

  return response.data.data
}

let refreshPromise: Promise<string> | null = null

const refreshToken = () => {
  if (!refreshPromise) {
    refreshPromise = refreshTokenApi()
      .then(({ accessToken }) => {
        accessTokenStorage.set(accessToken)
        return accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

axiosInstance.interceptors.response.use(response => {
  return response
})

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    if (
      (error.response as AxiosResponse<BaseResponse>).data?.code ===
        'TOKEN_EXPIRED' &&
      !original?._retry
    ) {
      original._retry = true

      const url = original.url ?? ''
      if (url.includes('/auth/refresh')) {
        accessTokenStorage.clear()
        return Promise.reject(error)
      }

      const current = accessTokenStorage.get()
        ? `Bearer ${accessTokenStorage.get()}`
        : null

      const sent =
        (original.headers?.Authorization as string | undefined) ?? null

      if (current && sent && current !== sent) {
        original.headers = {
          ...(original.headers ?? {}),
          Authorization: current,
        }
        return axiosInstance(original)
      }

      try {
        const newAccess = await refreshToken()

        original.headers = {
          ...(original.headers ?? {}),
          Authorization: `Bearer ${newAccess}`,
        }

        return axiosInstance(original)
      } catch (e) {
        accessTokenStorage.clear()

        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  },
)

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
