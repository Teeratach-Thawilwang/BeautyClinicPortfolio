import React from 'react'
import {View} from 'react-native'
import {Icon, Text, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function MenuCardItem({
  label,
  labelStyle,
  icon,
  iconStyle,
  containerStyle,
  rightElement,
  onPress = () => {},
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const rightComponent = (
    <Icon
      source='ion-chevron-forward'
      size={20}
      color={theme.colors.onSurfaceVariant}
    />
  )

  return (
    <TouchableRipple
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <>
        {icon ? (
          <View style={styles.iconLeft}>
            <Icon
              source={icon}
              size={iconStyle?.width ?? 20}
              color={iconStyle?.color ?? theme.colors.primary}
            />
          </View>
        ) : null}
        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={[styles.text, labelStyle]}>
          {label}
        </Text>
        {rightElement ?? rightComponent}
      </>
    </TouchableRipple>
  )
}
