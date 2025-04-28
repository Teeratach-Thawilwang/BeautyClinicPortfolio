import 'react-native-gesture-handler'

import React from 'react'
import {ScrollView, View} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'

export default function DashboardScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
      <View style={{height: 1000, backgroundColor: 'red'}}></View>
    </ScrollView>
  )
}
