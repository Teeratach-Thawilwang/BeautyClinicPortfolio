import {PaymentMethod} from '@utils/Payments'

export type CreateOrderPayload = {
  courseId: number
  userId: string
  amount: number
  paymentMethod: PaymentMethod
  token?: string
  returnUri?: string
}
export type CreateOrderProps = Omit<CreateOrderPayload, 'userId'>

export type CreateOrderResponse = {
  id: string
  amount: number
  net: number
  fee: number
  fee_vat: number
  qr_code_image: string
  authorize_uri: string
  reference_no: string
}

export type CardDetail = {
  name: string
  number: string
  expirationMonth: string
  expirationYear: string
  securityCode: string
}
