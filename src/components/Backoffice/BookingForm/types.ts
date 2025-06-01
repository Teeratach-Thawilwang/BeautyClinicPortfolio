import {BookingFormData} from '@hooks/backoffice/BookingHooks'
import {BookingForm} from '@models/BookingTypes'

export type Props = {
  onSubmit: (formData: BookingFormData) => void
  onDelete?: (() => Promise<void>) | (() => void)
  booking: BookingForm
}
