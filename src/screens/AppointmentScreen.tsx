import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Button, MD3Theme} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {ScreenNavigationProp} from '@navigation/AppNavigator'

export default function AppointmentScreen() {
  const {theme, toggleTheme} = useTheme()
  const navigation = useNavigation<ScreenNavigationProp>()
  return (
    <View style={getStyles(theme).container}>
      <Text style={getStyles(theme).text}>AppointmentScreen</Text>
      <Button onPress={toggleTheme}>Change Theme</Button>
      <Button onPress={() => navigation.navigate('Home', {screen: 'HomeScreen'})}>Home</Button>
      <Button onPress={() => navigation.navigate('Menu', {screen: 'MenuScreen'})}>Menu</Button>
    </View>
  )
}

function getStyles(theme: MD3Theme) {
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
      fontSize: theme.fonts.headlineLarge.fontSize,
    },
  })
}
