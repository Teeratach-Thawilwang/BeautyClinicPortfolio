export type Props<T> = {
  headers: string[]
  data: T[]
  onRowPress?: (row: T) => void
  isLoading?: boolean
  containerStyle?: any
  rowStyle?: any
  headerStyle?: any
  headerCellStyle?: any
  contentStyle?: any
  contentCellStyle?: any
  iconStyle?: any
  skeletonColor?: string
}
