import {CardFormData} from '@hooks/store/OrderHooks'

export type Props = {
  amount: number
  onSubmit: (card: CardFormData) => void
  disabled: boolean
}
