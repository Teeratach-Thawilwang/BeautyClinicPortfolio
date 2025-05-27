import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import React, {useCallback, useState} from 'react'
import {Image, ImageSourcePropType, ImageStyle, View} from 'react-native'
import {Icon, Button as RNButton} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function Button({
  children,
  onPress,
  mode = 'contained',
  disabled,
  icon,
  imageIcon,
  useLoading = false,
  isLoading,
  containerStyle,
  labelStyle,
  iconStyle,
  iconPosition = 'left',
  imageStyle,
  rippleColor,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const defaultColor = getDefaultColor(mode, disabled, theme)

  const [isLoadingInternal, setIsLoadingInternal] = useState(false)

  const onPressHandler = useCallback(async () => {
    useLoading ? setIsLoadingInternal(true) : null
    await onPress()
    useLoading ? setIsLoadingInternal(false) : null
  }, [onPress])

  if (mode == 'skeleton') {
    return <View style={[styles.container, containerStyle, styles.skeleton]} />
  }

  return (
    <RNButton
      mode={mode}
      loading={(useLoading && isLoadingInternal) || isLoading}
      style={[
        styles.container,
        mode == 'outlined' ? {borderColor: defaultColor} : {},
        containerStyle,
      ]}
      contentStyle={[
        styles.content,
        iconPosition == 'right' ? styles.flexReverse : {},
      ]}
      labelStyle={[styles.label, labelStyle]}
      onPress={onPressHandler}
      icon={iconComponent(defaultColor, icon, iconStyle, imageIcon, imageStyle)}
      disabled={disabled}
      rippleColor={mode == 'text' ? 'transparent' : rippleColor}>
      {children}
    </RNButton>
  )
}

function iconComponent(
  defaultColor: string,
  icon?: string,
  iconStyle?: {width: number; color: string; borderRadius?: number},
  imageIcon?: ImageSourcePropType,
  imageStyle?: ImageStyle,
) {
  if (imageIcon) {
    return () => <Image source={imageIcon} style={imageStyle} />
  }

  if (icon) {
    return () => (
      <Icon
        source={icon}
        size={iconStyle?.width ?? 20}
        color={iconStyle?.color ?? defaultColor}
      />
    )
  }

  return () => null
}

export function getDefaultColor(
  mode: 'contained' | 'text' | 'outlined' | 'skeleton',
  disabled: boolean | undefined,
  theme: AdaptiveMD3Theme,
) {
  if (mode == 'contained') {
    return theme.colors.onPrimary
  }
  if (disabled) {
    return theme.colors.onSurfaceDisabled
  }
  return theme.colors.primary
}
