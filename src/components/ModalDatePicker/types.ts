import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native'

export type Props = {
  onChange: (date: string) => void
  buttonText: string
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
