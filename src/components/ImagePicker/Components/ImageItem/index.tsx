import React from 'react'
import {Image, View} from 'react-native'
import {IconButton} from 'react-native-paper'

import {getStyles} from './styles'
import {Props} from './types'

export default function ImageItem({
  uri,
  onRemove,
  imageStyle,
  removeIconStyle,
}: Props) {
  const styles = getStyles()
  return (
    <View style={[styles.imageBox, imageStyle]}>
      <Image source={{uri: uri}} style={styles.image} />
      <IconButton
        icon='ion-trash-outline'
        iconColor={removeIconStyle?.color ?? styles.removeIcon.color}
        style={styles.removeIcon}
        size={removeIconStyle?.width ?? styles.removeIcon.width}
        onPress={onRemove}
      />
    </View>
  )
}
