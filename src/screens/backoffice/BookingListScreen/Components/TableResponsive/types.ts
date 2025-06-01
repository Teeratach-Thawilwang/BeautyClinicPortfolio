import {BookingListItem} from '@models/BookingTypes'

export type Props = {
  headers: string[]
  data: BookingListItem[]
  isLoading: boolean
  onRowPress: (row: BookingListItem) => void
  current: number
  last: number
  onPaginatePress: (page: number) => void
}
