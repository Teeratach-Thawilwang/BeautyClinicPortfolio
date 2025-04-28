import {ReactNode} from 'react'
import {ImageSourcePropType} from 'react-native'

export type Props = {
  children?: ReactNode
  visible: boolean
  title: string
  text: string
  imageSource: ImageSourcePropType
  buttonText?: string
  onButtonPress?: () => void
  onDismiss?: () => void
}
