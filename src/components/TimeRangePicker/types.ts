import {ViewStyle} from 'react-native'

export type TimeRange = {
  start: string
  end: string
}

export type Props = {
  onCancel: () => void
  onConfirm: (time: TimeRange) => void
  initialTimeRange?: TimeRange
  error?: string
  containerStyle?: ViewStyle
}
