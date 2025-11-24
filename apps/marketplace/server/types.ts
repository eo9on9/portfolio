export interface Product {
  id: string
  item_key: string
  type: string
  listed_by: string
  price: number
  amount: number
  created_at: number
}

export interface Item {
  name: string
  category: string
  image_src: string
  grade: string
  description: string
}
