import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'

export default function AppointmentScreen() {
  const {theme, toggleTheme} = useTheme()
  const navigation = useNavigate()
  return (
    <View style={getStyles(theme).container}>
      <Text style={getStyles(theme).text}>AppointmentScreen</Text>
      <Button onPress={toggleTheme}>Change Theme</Button>
      <Button
        onPress={() =>
          navigation.navigate('BottomTabScreens', {screen: 'Home'})
        }>
        Home
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('BottomTabScreens', {screen: 'Menu'})
        }>
        Menu
      </Button>
    </View>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme.colors.onSurface,
      textAlign: 'center',
      fontSize: theme.fontSize.displayLarge,
    },
  })
}
