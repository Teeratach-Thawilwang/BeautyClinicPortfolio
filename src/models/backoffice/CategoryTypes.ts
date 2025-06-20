import {ImageFileAsset} from '@components/ImagePicker/types'
import {CategoryStatus} from '@enums/StatusEnums'

export type Category = {
  id: number
  name: string
  status: CategoryStatus
  images: ImageFileAsset[]
  created_at: string
}

export type CategoryListItem = {
  id: number
  name: string
  status: CategoryStatus
  created_at: string
}

export type CategoryList = {
  data: CategoryListItem[]
  last: number
}

export type CategoryCreateProps = Omit<Category, 'id' | 'created_at'>
export type CategoryUpdateProps = Omit<Category, 'created_at'>
