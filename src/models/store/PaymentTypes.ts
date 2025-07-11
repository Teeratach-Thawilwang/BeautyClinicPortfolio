import {PaymentMethod} from '@enums/PaymentEnums'

export type PaymentFeeType = {
  fee: number
  type: 'FIX_COST' | 'PERCENT'
}

export type PaymentFee = Record<PaymentMethod, PaymentFeeType>
