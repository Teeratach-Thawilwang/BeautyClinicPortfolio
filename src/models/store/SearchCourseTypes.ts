import {ImageFileAsset} from '@components/ImagePicker/types'
import {WorkingTime} from '@models/backoffice/CourseTypes'

export type SearchCourseItem = {
  id: number
  category?: {id: number; name: string}
  name: string
  description: string
  price: number
  images: ImageFileAsset[]
  treatment_rounds: number
  duration_per_round: number
  working_time_monday: WorkingTime
  working_time_tuesday: WorkingTime
  working_time_wednesday: WorkingTime
  working_time_thursday: WorkingTime
  working_time_friday: WorkingTime
  working_time_saturday: WorkingTime
  working_time_sunday: WorkingTime
}

export type SearchCourseList = {
  data: SearchCourseItem[]
  last: number
  total: number
}
