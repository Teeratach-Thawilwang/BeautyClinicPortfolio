import {ImageFileAsset} from '@components/ImagePicker/types'
import {WorkingTime} from '@models/backoffice/CourseTypes'

export type Widget =
  | {
      type: 'banner'
      items: WidgetBannerItem[]
    }
  | {
      type: 'category'
      items: WidgetCategoryItem[]
    }
  | {
      type: 'course'
      items: WidgetCourseItem[]
    }

export type WidgetBannerItem = {
  id: number
  image: ImageFileAsset
}

export type WidgetCategoryItem = {
  id: number
  name: string
  images: ImageFileAsset[]
}

export type WidgetCourseItem = {
  categoryId: number
  categoryName: string
  courses: WidgetCourseItemDetail[]
}

export type WidgetCourseItemDetail = {
  id: number
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
