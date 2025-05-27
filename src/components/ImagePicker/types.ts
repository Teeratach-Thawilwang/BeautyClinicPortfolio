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
  saveToPhotos?: boolean
  containerStyle?: any
  titleStyle?: any
  noteStyle?: any
  removeIconStyle?: {width: number; color: string}
  imageContainerStyle?: any
  imageStyle?: any
  buttonStyle?: any
  buttonIconStyle?: {width: number; color: string}
  buttonTextStyle?: any
}
