import {ImageFileAsset} from '@components/ImagePicker/types'

// customer course list
export type CustomerCourseItem = {
  id: number
  name: string
  images: ImageFileAsset[]
  price: number
  duration_per_round: number
  quota_round: number
  used_round: number
  created_at: string
}

export type CustomerCourseList = {
  data: CustomerCourseItem[]
  last: number
  total: number
}
