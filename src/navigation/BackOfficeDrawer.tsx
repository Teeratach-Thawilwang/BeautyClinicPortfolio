import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {MD3Theme} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

export default function BackOfficeDrawer(props: DrawerContentComponentProps) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      <Text>BackOfficeDrawer</Text>
    </DrawerContentScrollView>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.inverseSurface,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
    },
  })
}
