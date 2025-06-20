import {OrderFormData} from '@hooks/backoffice/OrderHooks'
import {Order} from '@models/backoffice/OrderTypes'

export type Props = {
  onSubmit: (formData: OrderFormData) => void
  order: Order
}
