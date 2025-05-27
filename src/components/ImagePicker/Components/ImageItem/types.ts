import {ImageStyle} from 'react-native'

export type Props = {
  uri: string
  onRemove: () => void
  imageStyle?: ImageStyle
  removeIconStyle?: {width: number; color: string}
}
