import {PaymentMethod} from '@utils/Payments'

export type Props = {
  onChange: (method: PaymentMethod | undefined) => void
}
