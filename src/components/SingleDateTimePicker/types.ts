export type Props = {
  onChange: (date: Date) => void
  mode?: 'date' | 'time' | 'datetime'
  initialDate?: Date
  minimumDate?: Date
  maximumDate?: Date
  width?: number
  height?: number
  backgroundColor?: string
  dividerColor?: string
}
