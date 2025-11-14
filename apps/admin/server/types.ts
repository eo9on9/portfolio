export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  status: 'active' | 'inactive'
}

export interface Order {
  id: string
  customer: string
  product: string
  quantity: number
  amount: number
  orderedAt: number
  status: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: string
  password: string
  notifications: {
    newOrder: boolean
    lowStock: boolean
    customerInquiry: boolean
    deliveryStatusChange: boolean
    weeklyReport: boolean
  }
  lastPasswordChangedAt: number
}
