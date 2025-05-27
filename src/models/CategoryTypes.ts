import {CategoryStatus} from '@enums/StatusEnums'

export type Category = {
  id: number
  name: string
  status: CategoryStatus
  images: string[]
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
