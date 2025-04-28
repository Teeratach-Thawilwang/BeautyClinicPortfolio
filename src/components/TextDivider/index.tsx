import React from 'react'
import {View} from 'react-native'
import {Divider, Text} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function TextDivider({
  children,
  containerStyle,
  textColor,
  dividerStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={[styles.container, containerStyle]}>
      <Divider testID='left-divider' style={styles.devider} />
      <Text
        variant='titleMedium'
        style={[styles.text, textColor ? {color: textColor} : {}]}>
        {children}
      </Text>
      <Divider testID='right-divider' style={[styles.devider, dividerStyle]} />
    </View>
  )
}
