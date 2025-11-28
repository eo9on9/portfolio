import { request } from '@shared/api/request'

export const getConversationState = async () => {
  const response = await request.get('/conversation/state')

  return response
}
