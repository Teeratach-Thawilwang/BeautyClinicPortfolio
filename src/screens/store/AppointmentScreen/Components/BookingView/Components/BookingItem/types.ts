import {BookingItem} from '@models/store/BookingTypes'

export type Props = {
  booking: BookingItem
  onCancel: () => void
}
