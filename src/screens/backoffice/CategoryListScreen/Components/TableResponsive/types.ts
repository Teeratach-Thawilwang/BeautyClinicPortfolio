import {CategoryListItem} from '@models/CategoryTypes'

export type Props = {
  headers: string[]
  data: CategoryListItem[]
  isLoading: boolean
  onRowPress: (row: CategoryListItem) => void
  current: number
  last: number
  onPaginatePress: (page: number) => void
}
