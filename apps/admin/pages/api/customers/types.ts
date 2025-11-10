export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  status: 'active' | 'inactive'
}
