import {TextStyle, ViewStyle} from 'react-native'

import {TimeRange} from '@components/TimeRangePicker/types'

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
  removeIconStyle?: {width?: number; color?: string}
  buttonStyle?: ViewStyle
  buttonLabelStyle?: TextStyle
}
