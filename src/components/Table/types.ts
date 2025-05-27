export type Props<T> = {
  headers: string[]
  data: T[]
  onRowPress?: (row: T) => void
  isLoading?: boolean
  containerStyle?: any
  headerStyle?: any
  headerCellStyle?: any
  rowStyle?: any
  rowCellStyle?: any
  skeletonColor?: string
}
