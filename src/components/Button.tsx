import React, {useState} from 'react'
import {Image, ImageSourcePropType} from 'react-native'
import {Icon, Button as RNButton} from 'react-native-paper'

type ButtonProps = {
  children: string
  onPress: (() => void) | (() => Promise<void>)
  mode?: 'contained' | 'text' | 'outlined'
  icon?: string
  imageIcon?: ImageSourcePropType
  useLoading?: boolean
  containerStyle?: any
  contentStyle?: any
  labelStyle?: any
  iconStyle?: {width: number; color: string}
  imageIconStyle?: any
}

export default function Button({
  children,
  onPress,
  mode = 'contained',
  icon,
  imageIcon,
  useLoading = false,
  containerStyle,
  contentStyle,
  labelStyle,
  iconStyle,
  imageIconStyle,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const iconComponent = imageIcon
    ? () => <Image source={imageIcon} style={imageIconStyle} />
    : icon
      ? () => (
          <Icon
            source={icon}
            size={iconStyle?.width ?? 20}
            color={iconStyle?.color}
          />
        )
      : () => null

  async function onPressHandler() {
    useLoading ? setIsLoading(true) : null
    await onPress()
    useLoading ? setIsLoading(false) : null
  }

  return (
    <RNButton
      mode={mode}
      loading={useLoading && isLoading}
      style={containerStyle}
      labelStyle={labelStyle}
      contentStyle={contentStyle}
      onPress={onPressHandler}
      icon={iconComponent}>
      {children}
    </RNButton>
  )
}
