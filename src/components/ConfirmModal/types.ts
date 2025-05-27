import {TextStyle, ViewStyle} from 'react-native'

export type Props = {
  isVisible: boolean
  onConfirm: () => void
  onDismiss: () => void
  title?: string
  text?: string
  confirmButtonText?: string
  containerStyle?: ViewStyle
  cardStyle?: ViewStyle
  titleStyle?: ViewStyle
  textStyle?: TextStyle
  buttonContainerStyle?: ViewStyle
  cancelButtonContainerStyle?: ViewStyle
  cancelButtonLabelStyle?: TextStyle
  confirmButtonContainerStyle?: ViewStyle
  confirmButtonLabelStyle?: TextStyle
}
