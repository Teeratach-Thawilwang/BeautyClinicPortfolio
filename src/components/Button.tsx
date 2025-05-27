import React, {useState} from 'react'
import {Image, ImageSourcePropType} from 'react-native'
import {Button as RNButton} from 'react-native-paper'

type ButtonStyleProps = {
  container?: any
  content?: any
  label?: any
  icon?: any
}

type ButtonProps = {
  children: string
  onPress: (() => void) | (() => Promise<void>)
  icon?: ImageSourcePropType
  mode?: 'contained' | 'text'
  useLoading?: boolean
  styles?: ButtonStyleProps
}

export default function Button({
  children,
  onPress,
  icon,
  mode = 'contained',
  useLoading = false,
  styles,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const iconComponent = icon
    ? () => <Image source={icon} style={styles?.icon} />
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
      style={styles?.container}
      labelStyle={styles?.label}
      contentStyle={styles?.content}
      onPress={onPressHandler}
      icon={iconComponent}>
      {children}
    </RNButton>
  )
}
