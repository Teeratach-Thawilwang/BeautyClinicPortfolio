import {ImageStyle, TextStyle, ViewStyle} from 'react-native'

export type ImageFileAsset = {
  uri: string
  type: string
}

export type Props = {
  onChange: (fileAssets: ImageFileAsset[]) => void
  initialUris?: ImageFileAsset[]
  maxPhoto?: number
  maxSize?: number
  title?: string
  note?: string
  saveToPhotos?: boolean
  gap?: number
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
  noteStyle?: TextStyle
  removeIconStyle?: {width: number; color: string}
  imageStyle?: ImageStyle
  buttonStyle?: ViewStyle
  buttonIconStyle?: {width: number; color: string}
  buttonTextStyle?: TextStyle
}

export type SortableItem = {
  itemType: 'image' | 'add' | 'camera'
  uri: string
  type: string
  key: string
}
