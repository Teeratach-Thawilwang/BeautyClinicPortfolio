import {PaymentMethod} from '@enums/PaymentEnums'

export type Props = {
  onChange: (method: PaymentMethod | undefined) => void
}
