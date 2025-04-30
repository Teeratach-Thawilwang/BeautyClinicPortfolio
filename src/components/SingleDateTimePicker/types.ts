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
  modal?: boolean
  title?: string | null
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: (date: Date) => void
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30
}
