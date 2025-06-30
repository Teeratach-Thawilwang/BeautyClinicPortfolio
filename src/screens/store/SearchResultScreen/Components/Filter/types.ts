export type Props = {
  onChange: (value: any) => void
  initialOrderBy?: 'ASC' | 'DESC'
  initialMinPrice?: number
  initialMaxPrice?: number
  searchCount: number
}
