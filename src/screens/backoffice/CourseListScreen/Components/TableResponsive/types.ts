import {CourseListItem} from '@models/CourseTypes'

export type Props = {
  headers: string[]
  data: CourseListItem[]
  isLoading: boolean
  onRowPress: (row: CourseListItem) => void
  current: number
  last: number
  onPaginatePress: (page: number) => void
}
