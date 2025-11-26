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

export interface Conversation {
  conversation_id: string
  partner: string
  product_id: string
  last_message: string
  last_message_at: number
  has_new_message: boolean
}

export interface Message {
  message_id: string
  conversation_id: string
  sender: string
  content: string
  created_at: number
}
