import {PaymentMethod} from '@enums/PaymentEnums'
import {OrderStatusEnum} from '@enums/StatusEnums'

// create-order
export type CreateOrderProps = {
  courseId: number
  stangAmount: number
}
export type CreateOrderResponse = {
  id: number
  user_id: string
  course_id: string
  status: OrderStatusEnum
  amount: number
  updated_by: string
  created_at: string
}

// create-charge
export type CreateChargeProps = {
  orderId: number
  paymentMethod: PaymentMethod
  token?: string
  returnUri?: string
}
export type CreateChargeResponse = {
  id: string
  amount: number
  net: number
  fee: number
  fee_vat: number
  qr_code_image: string
  authorize_uri: string
  reference_no: string
}

// create-token
export type CardDetail = {
  name: string
  number: string
  expirationMonth: string
  expirationYear: string
  securityCode: string
}
