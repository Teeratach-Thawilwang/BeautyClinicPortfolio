import {OrderStatusEnum} from '@enums/StatusEnums'

export type Order = {
  id: number
  user_id: string
  course_id: string
  status: OrderStatusEnum
  amount: number
  updated_by: string
  created_at: string
}

export type OrderListItem = {
  id: number
  user_id: string
  course_id: string
  status: OrderStatusEnum
  amount: number
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
