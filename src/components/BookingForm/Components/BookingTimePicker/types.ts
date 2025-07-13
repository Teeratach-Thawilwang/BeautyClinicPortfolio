import {TimeRange} from '@components/TimeRangePicker/types'

export type Props = {
  initialTime?: TimeRange
  availableSlots?: TimeRange[]
  timeSlotLoading: boolean
  onChange?: (time: TimeRange) => void
}
