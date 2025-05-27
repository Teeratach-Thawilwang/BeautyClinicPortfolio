import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'

export type Props = {
  children: string
  onPress: (() => void) | (() => Promise<void>)
  mode?: 'contained' | 'text' | 'outlined' | 'skeleton'
  disabled?: boolean
  icon?: string
  imageIcon?: ImageSourcePropType
  useLoading?: boolean
  isLoading?: boolean
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  iconStyle?: {width: number; color: string; borderRadius?: number}
  iconPosition?: 'left' | 'right'
  imageStyle?: ImageStyle
  rippleColor?: string
}
