import {OrderStatusEnum} from '@enums/StatusEnums'

export type Order = {
  id: number
  user_id: string
  course_id: string
  status: OrderStatusEnum
  original_price: number
  net_price: number
  updated_by: string
  created_at: string
}

export type OrderListItem = {
  id: number
  user_id: string
  course_id: string
  status: OrderStatusEnum
  net_price: number
  created_at: string
}

export type OrderList = {
  data: OrderListItem[]
  last: number
}

export type OrderUpdateProps = {
  id: number
  status: OrderStatusEnum
}

export type OrderForm = {
  status: OrderStatusEnum
}
