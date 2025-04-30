import {CourseStatus} from '@enums/StatusEnums'

export type WorkingTime = {
  start_at: string
  end_at: string
}[]

export type Course = {
  id: number
  name: string
  description: string
  status: CourseStatus
  price: number
  images: string[]
  treatment_rounds: number
  duration_per_round: number
  booking_limit_per_round: number
  appointment_editable_before: number
  working_time_monday: WorkingTime
  working_time_tuesday: WorkingTime
  working_time_wednesday: WorkingTime
  working_time_thursday: WorkingTime
  working_time_friday: WorkingTime
  working_time_saturday: WorkingTime
  working_time_sunday: WorkingTime
  created_at: string
  updated_at: string
}

export type CourseListItem = {
  id: number
  name: string
  status: CourseStatus
  price: number
  created_at: string
}

export type CourseList = {
  data: CourseListItem[]
  last: number
}

export type CourseCreateProps = Omit<Course, 'id' | 'created_at' | 'updated_at'>
export type CourseUpdateProps = Omit<Course, 'created_at' | 'updated_at'>
