import React from 'react'
import {View} from 'react-native'
import {Button, Text} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function InlineTextLink({
  text,
  linkText,
  onPress,
  containerStyle,
  textStyle,
  linkTextStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
      <Button
        mode='text'
        rippleColor='rgba(0, 0, 0, 0)'
        labelStyle={[styles.linkText, linkTextStyle]}
        onPress={onPress}>
        {linkText}
      </Button>
    </View>
  )
}
