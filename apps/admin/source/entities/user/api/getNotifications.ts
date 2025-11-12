import {
  fromNotificationsDTO,
  NotificationsDTO,
} from '@entities/user/api/dto/notifications'
import { Notifications } from '@entities/user/model/notifications'
import { request } from '@shared/api/request'

type GetNotificationsResDTO = NotificationsDTO

export type GetNotificationsRes = Notifications

const fromGetNotificationsResDTO = (
  dto: GetNotificationsResDTO,
): GetNotificationsRes => {
  return fromNotificationsDTO(dto)
}

export const getNotifications = async (): Promise<GetNotificationsRes> => {
  const response = await request.get<GetNotificationsResDTO>(
    '/profile/notifications',
  )

  return fromGetNotificationsResDTO(response)
}
