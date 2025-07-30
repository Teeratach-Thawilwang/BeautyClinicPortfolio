import FastImage from '@d11/react-native-fast-image'
import React from 'react'

import {getStyles} from './styles'
import {Props} from './types'

export default React.memo(function ImageItem({uri}: Props) {
  const styles = getStyles()

  return <FastImage source={{uri}} style={styles.image} resizeMode='contain' />
})
