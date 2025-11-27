import { request } from '@shared/api/request'

export const getInit = async () => {
  const response = await request.get('/init')

  return response
}
