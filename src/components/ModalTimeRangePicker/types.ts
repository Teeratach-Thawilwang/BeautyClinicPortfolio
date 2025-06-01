import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native'

import {TimeRange} from '@components/TimeRangePicker/types'

export type Props = {
  onChange: (time: TimeRange) => void
  buttonText: string
  initialTimeRange?: TimeRange
  containerStyle?: ViewStyle
  modalContainerStyle?: ViewStyle
  cardStyle?: ViewStyle
  buttonContainerStyle?: ViewStyle
  buttonLabelStyle?: TextStyle
  icon?: string
  iconPosition?: 'left' | 'right'
  iconStyle?: {width: number; color: string; borderRadius?: number}
  imageIcon?: ImageSourcePropType
  imageStyle?: ImageStyle
}
