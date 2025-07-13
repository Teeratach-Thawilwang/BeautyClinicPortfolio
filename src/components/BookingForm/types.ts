import {TimeRange} from '@components/TimeRangePicker/types'

type BookingFormData = {
  date: string
  time: TimeRange
}

export type Props = {
  initialDate?: string
  initialTime?: TimeRange
  availableSlots?: TimeRange[]
  timeSlotLoading: boolean
  onDateChange: (date: string) => void
  onSubmit: (data: BookingFormData) => Promise<void>
}
