import {ImageFileAsset} from '@components/ImagePicker/types'
import {CustomerCourseStatus} from '@enums/StatusEnums'

export type CourseDetail = {
  id: number
  name: string
  price: number
  images: ImageFileAsset[]
  treatment_rounds: number
  duration_per_round: number
}

export type CustomerCourse = {
  id: number
  course: CourseDetail
  order_id: string
  quota_round: number
  used_round: number
  status: CustomerCourseStatus
  updated_by: string
  created_at: string
}

export type CustomerCourseList = {
  data: CustomerCourse[]
  last: number
}

export type CustomerCourseUpdateProps = {
  id: number
  quota_round: number
  used_round: number
  status: CustomerCourseStatus
}

export type CustomerCourseForm = {
  quota_round: number
  used_round: number
  status: CustomerCourseStatus
}
