import {NavigationContainer} from '@react-navigation/native'
import {render} from '@testing-library/react-native'
import React from 'react'

import ThemeProvider from '@context-providers/ThemeProvider'

function Warpper(ui: React.ReactElement, options?: any) {
  return render(ui, {
    wrapper: ({children}) => (
      <NavigationContainer>
        <ThemeProvider>{children}</ThemeProvider>
      </NavigationContainer>
    ),
    ...options,
  })
}

export * from '@testing-library/react-native'
export {Warpper as render}
