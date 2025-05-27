import React from 'react'
import {Text, View} from 'react-native'
import {Icon, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {adjustColorBrightness} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

export default function ButtonItem({
  title,
  icon,
  onPress,
  containerStyle,
  titleStyle,
  iconStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  const rippleColor = adjustColorBrightness(
    containerStyle?.backgroundColor ?? styles.button.backgroundColor,
    -12,
  )

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableRipple
        style={{
          ...styles.button,
          backgroundColor:
            containerStyle?.backgroundColor ?? styles.button.backgroundColor,
        }}
        onPress={onPress}
        rippleColor={rippleColor}>
        <>
          <Icon
            source={icon}
            color={iconStyle?.color ?? styles.icon.color}
            size={iconStyle?.width ?? styles.icon.width}
          />
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </>
      </TouchableRipple>
    </View>
  )
}
