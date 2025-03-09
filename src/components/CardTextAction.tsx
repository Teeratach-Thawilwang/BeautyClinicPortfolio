import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Icon, MD3Theme, Text, TouchableRipple} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

export default function CardTextAction({
  children,
  text,
  icon,
  iconColor,
}: {
  children: ReactNode
  text: string
  icon?: string
  iconColor?: string
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <TouchableRipple onPress={() => {}} style={styles.container}>
      <>
        {icon ? (
          <View style={styles.iconLeft}>
            <Icon source={icon} size={20} color={iconColor ?? theme.colors.secondary} />
          </View>
        ) : null}
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>
          {text}
        </Text>
        {children}
      </>
    </TouchableRipple>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingLeft: 20,
      paddingRight: 10,
      borderWidth: 0,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      flexGrow: 1,
      color: theme.colors.onSurface,
      fontSize: theme.fonts.titleMedium.fontSize,
    },
    iconLeft: {
      marginRight: 10,
    },
  })
}
