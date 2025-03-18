import React, {useState} from 'react'
import {Image, ImageSourcePropType} from 'react-native'
import {Button as RNButton} from 'react-native-paper'

type ButtonProps = {
  children: string
  onPress: (() => void) | (() => Promise<void>)
  icon?: ImageSourcePropType
  mode?: 'contained' | 'text'
  useLoading?: boolean
  containerStyle?: any
  contentStyle?: any
  labelStyle?: any
  iconStyle?: any
}

export default function Button({
  children,
  onPress,
  icon,
  mode = 'contained',
  useLoading = false,
  containerStyle,
  contentStyle,
  labelStyle,
  iconStyle,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const iconComponent = icon
    ? () => <Image source={icon} style={iconStyle} />
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
