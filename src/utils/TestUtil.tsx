import {NavigationContainer} from '@react-navigation/native'
import {render, renderHook} from '@testing-library/react-native'
import React from 'react'

import ThemeProvider from '@context-providers/ThemeProvider'

function Warpper(ui: React.ReactElement, options?: any) {
  return render(ui, {
    wrapper: ({children}) => (
      <ThemeProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    ),
    ...options,
  })
}

function RenderHookWrapper<T>(hook: () => T) {
  return renderHook(hook, {
    wrapper: ({children}) => (
      <NavigationContainer>{children}</NavigationContainer>
    ),
  })
}

export * from '@testing-library/react-native'
export {Warpper as render}
export {RenderHookWrapper as renderHook}
