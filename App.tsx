import React from 'react'
import Config from 'react-native-config'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import ThemeProvider from '@context-providers/ThemeProvider'
import AppNavigator from '@navigation/AppNavigator'

if (Config.STAGING != 'production') {
  require('./ReactotronConfig')
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
