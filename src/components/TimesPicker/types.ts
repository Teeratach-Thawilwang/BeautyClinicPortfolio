import {TextStyle, ViewStyle} from 'react-native'

export type TimeRange = {
  startTime: string
  endTime: string
}

export type Props = {
  onChange: (times: TimeRange[]) => void
  initialValue?: TimeRange[]
  maxLength?: number
  title?: string
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
  timeContainerStyle?: ViewStyle
  timeBoxStyle?: ViewStyle
  timeLabelStyle?: TextStyle
  removeIconStyle?: {width: number; color: string}
  buttonStyle?: ViewStyle
  buttonLabelStyle?: TextStyle
}
