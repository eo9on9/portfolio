import {
  fromNotificationsDTO,
  NotificationsDTO,
} from '@entities/user/api/dto/notifications'
import { Notifications } from '@entities/user/model/notifications'
import { request } from '@shared/api/request'

interface UpdateNotificationsParams {
  newOrder?: boolean
  lowStock?: boolean
  customerInquiry?: boolean
  deliveryStatusChange?: boolean
  weeklyReport?: boolean
}

type UpdateNotificationsResDTO = NotificationsDTO

export type UpdateNotificationsRes = Notifications

const fromUpdateNotificationsResDTO = (
  dto: UpdateNotificationsResDTO,
): UpdateNotificationsRes => {
  return fromNotificationsDTO(dto)
}

export const updateNotifications = async (
  params: UpdateNotificationsParams,
): Promise<UpdateNotificationsRes> => {
  const response = await request.put<UpdateNotificationsResDTO>(
    '/profile/notifications',
    {
      data: params,
    },
  )
  return fromUpdateNotificationsResDTO(response)
}
