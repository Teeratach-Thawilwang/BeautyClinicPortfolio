export enum PaymentMethod {
  QR_PROMPTPAY = 'QR_PROMPTPAY',
  CREDIT_CARD = 'CREDIT_CARD',
  K_PLUS = 'K_PLUS',
  SCB_EASY = 'SCB_EASY',
  KRUNGTHAI_NEXT = 'KRUNGTHAI_NEXT',
  BUALUANG = 'BUALUANG',
  KRUNGSRI = 'KRUNGSRI',
}

export const PaymentMethodSourceMapping = {
  QR_PROMPTPAY: 'promptpay',
  CREDIT_CARD: '',
  K_PLUS: 'mobile_banking_kbank',
  SCB_EASY: 'mobile_banking_scb',
  KRUNGTHAI_NEXT: 'mobile_banking_ktb',
  BUALUANG: 'mobile_banking_bbl',
  KRUNGSRI: 'mobile_banking_bay',
}

export const OMISE_SECRET_KEY = Deno.env.get('OMISE_SECRET_KEY')!
