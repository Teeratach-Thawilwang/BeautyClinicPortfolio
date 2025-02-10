import React, {createContext, useContext} from 'react'
import {Appearance} from 'react-native'
import {PaperProvider} from 'react-native-paper'
import {shallowEqual} from 'react-redux'

import {DarkTheme, LightTheme} from '@assets/Theme'
import IconProvider from '@context-providers/IconProvider'
import {ThemeEnum, ThemeType} from '@models/ThemeInterface'
import {store, useAppSelector} from '@store/Store'
import {toggle} from '@store/slices/ThemeSlice'

export default function ThemeProvider({children}: {children: JSX.Element}) {
  const {theme, schema, toggleTheme} = useThemeProvider()

  return (
    <ThemeContext.Provider value={{theme, schema, toggleTheme}}>
      <PaperProvider
        theme={theme}
        settings={{
          icon: props => <IconProvider {...props} />,
        }}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  )
}

export const ThemeContext = createContext<ThemeType | null>(null)

export function useTheme(): ThemeType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider and ReduxProvider respectively.')
  }
  return context
}

function useThemeProvider() {
  const themeSchema = getThemeSchema()
  const theme = themeSchema === ThemeEnum.Light ? LightTheme : DarkTheme

  return {theme, schema: themeSchema, toggleTheme}
}

function getThemeSchema() {
  const theme = useAppSelector(state => state.theme.theme, shallowEqual)
  return theme ?? (Appearance.getColorScheme() as ThemeEnum)
}

function toggleTheme() {
  store.dispatch(toggle())
}
