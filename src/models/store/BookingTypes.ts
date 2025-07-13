import {ImageFileAsset} from '@components/ImagePicker/types'
import {TimeRange} from '@components/TimeRangePicker/types'

// booking list
export type BookingItem = {
  id: number // booking.id
  customer_course_id: number
  name: string // course.name
  images: ImageFileAsset[] // course.images
  appointment_editable_before: number
  booking_date: string
  booking_time: TimeRange
}
export type BookingList = {
  data: BookingItem[]
  last: number
  total: number
}

// booking create
export type CreateBookingProps = {
  customer_course_id: number
  booking_date: string
  booking_time: TimeRange
}

// booking update
export type UpdateBookingProps = {
  id: number
  booking_date: string
  booking_time: TimeRange
}
