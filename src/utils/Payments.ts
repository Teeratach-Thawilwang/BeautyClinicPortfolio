export enum PaymentMethod {
  QR_PROMPTPAY = 'QR_PROMPTPAY',
  CREDIT_CARD = 'CREDIT_CARD',
  K_PLUS = 'K_PLUS',
  SCB_EASY = 'SCB_EASY',
  KRUNGTHAI_NEXT = 'KRUNGTHAI_NEXT',
  BUALUANG = 'BUALUANG',
  KRUNGSRI = 'KRUNGSRI',
}

export type PaymentFeeType = {
  fee: number
  type: 'FIX_COST' | 'PERCENT'
}

export type PaymentFee = Record<PaymentMethod, PaymentFeeType>

export const paymentFee: PaymentFee = {
  QR_PROMPTPAY: {fee: 1.65, type: 'PERCENT'},
  CREDIT_CARD: {fee: 3.65, type: 'PERCENT'},
  K_PLUS: {fee: 10, type: 'FIX_COST'},
  SCB_EASY: {fee: 10, type: 'FIX_COST'},
  KRUNGTHAI_NEXT: {fee: 10, type: 'FIX_COST'},
  BUALUANG: {fee: 10, type: 'FIX_COST'},
  KRUNGSRI: {fee: 10, type: 'FIX_COST'},
}

export function calculatePaymentFee(
  amount: number,
  paymentMethod: PaymentMethod,
  vat: number = 7,
) {
  const stang = amount * 100
  let fee = 0
  if (paymentFee[paymentMethod].type == 'FIX_COST') {
    fee = paymentFee[paymentMethod].fee * 100
  } else {
    fee = (stang * paymentFee[paymentMethod].fee) / 100
  }

  fee = fee * (1 + vat / 100)
  return Math.ceil(fee) / 100
}
