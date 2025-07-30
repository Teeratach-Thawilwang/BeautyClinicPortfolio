import FastImage from '@d11/react-native-fast-image'
import React from 'react'
import {View} from 'react-native'

import {getStyles} from './styles'
import {Props} from './types'

export default React.memo(function WidgetBannerItem({
  item,
  width,
  height,
}: Props) {
  const styles = getStyles(width, height)

  return (
    <View style={styles.container}>
      <FastImage
        source={{uri: item.image.uri}}
        style={styles.image}
        resizeMode='contain'
      />
    </View>
  )
})
