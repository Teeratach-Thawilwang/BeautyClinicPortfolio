import {TimeRange} from '@components/TimeRangePicker/types'
import {BookingStatus} from '@enums/StatusEnums'

export type Booking = {
  id: number
  user_id: string
  course_id: number
  booking_date: string
  booking_time: TimeRange
  status: BookingStatus
  update_by: string
  created_at: string
  updated_at: string
}

export type BookingListItem = {
  id: number
  user_id: string
  course_id: number
  booking_date: string
  booking_time: string
  status: BookingStatus
  created_at: string
}

export type BookingList = {
  data: BookingListItem[]
  last: number
}

export type BookingUpdateProps = Omit<Booking, 'created_at' | 'updated_at'>

export type BookingForm = {
  id: number
  user_id: string
  course_id: number
  booking_date: string
  booking_time: TimeRange
  status: BookingStatus
}
