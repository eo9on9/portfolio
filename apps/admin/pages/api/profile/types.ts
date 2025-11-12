export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: string
  notifications: {
    newOrder: boolean
    lowStock: boolean
    customerInquiry: boolean
    deliveryStatusChange: boolean
    weeklyReport: boolean
  }
  lastPasswordChangedAt: number
}
