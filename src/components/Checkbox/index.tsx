import React from 'react'
import {Text, View} from 'react-native'
import {Checkbox as CheckboxRNP, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function Checkbox({
  children,
  label,
  status,
  onPress,
  color,
  rippleColor,
  testID,
  containerStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <TouchableRipple
      testID={testID ?? 'checkbox'}
      style={[styles.container, containerStyle]}
      rippleColor={rippleColor}
      onPress={onPress}>
      <>
        {children}
        {label ? (
          <Text style={styles.text} numberOfLines={1}>
            {label}
          </Text>
        ) : null}
        <View style={styles.checkboxContainer}>
          <CheckboxRNP status={status} onPress={onPress} color={color} />
        </View>
      </>
    </TouchableRipple>
  )
}
