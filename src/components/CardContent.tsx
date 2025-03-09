import React, {ReactNode} from 'react'
import {StyleSheet} from 'react-native'
import {TouchableRipple} from 'react-native-paper'

export default function CardContent({
  children,
  onPress = () => {},
  style,
}: {
  children: ReactNode
  onPress?: () => void
  style?: any
}) {
  const defaultStyles = getStyles()

  return (
    <TouchableRipple
      onPress={onPress}
      style={{...defaultStyles.container, ...style}}
      rippleColor='rgba(255, 255, 255, 0.1)'>
      <>{children}</>
    </TouchableRipple>
  )
}

function getStyles() {
  return StyleSheet.create({
    container: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderWidth: 0,
    },
  })
}
