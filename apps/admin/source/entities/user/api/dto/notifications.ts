import { Notifications } from '@entities/user/model/notifications'

export interface NotificationsDTO {
  newOrder: boolean
  lowStock: boolean
  customerInquiry: boolean
  deliveryStatusChange: boolean
  weeklyReport: boolean
}

export const fromNotificationsDTO = (dto: NotificationsDTO): Notifications => {
  return {
    newOrder: dto.newOrder,
    lowStock: dto.lowStock,
    customerInquiry: dto.customerInquiry,
    deliveryStatusChange: dto.deliveryStatusChange,
    weeklyReport: dto.weeklyReport,
  }
}
