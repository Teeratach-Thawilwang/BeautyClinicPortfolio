export type Props = {
  onChange: (type: string, value: any) => void
  initialOrderBy?: 'ASC' | 'DESC'
  initialStartCreatedAt?: Date
  initialStopCreatedAt?: Date
  refreshing: boolean
}
