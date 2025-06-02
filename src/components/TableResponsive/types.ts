export type Props<T> = {
  headers: string[]
  data: T[]
  isLoading: boolean
  onRowPress: (row: T) => void
  current: number
  last: number
  onPaginatePress: (page: number) => void
}
