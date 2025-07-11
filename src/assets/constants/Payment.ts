import {PaymentFee} from '@models/store/PaymentTypes'

export const paymentFee: PaymentFee = {
  QR_PROMPTPAY: {fee: 1.65, type: 'PERCENT'},
  CREDIT_CARD: {fee: 3.65, type: 'PERCENT'},
  K_PLUS: {fee: 10, type: 'FIX_COST'},
  SCB_EASY: {fee: 10, type: 'FIX_COST'},
  KRUNGTHAI_NEXT: {fee: 10, type: 'FIX_COST'},
  BUALUANG: {fee: 10, type: 'FIX_COST'},
  KRUNGSRI: {fee: 10, type: 'FIX_COST'},
}
