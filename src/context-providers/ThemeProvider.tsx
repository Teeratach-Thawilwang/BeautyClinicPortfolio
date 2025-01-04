import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {createContext, useContext, useEffect, useState} from 'react'
import {PaperProvider} from 'react-native-paper'
import {MD3Theme} from 'react-native-paper/lib/typescript/types'

import {DarkTheme, LightTheme} from '@assets/Theme'
import IconProvider from '@context-providers/IconProvider'

export default function ThemeProvider({children}: {children: JSX.Element}) {
  const {schema, toggleTheme} = useThemeProvider()
  const theme = schema === ThemeEnum.Light ? LightTheme : DarkTheme

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

export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
}

export type ThemeType = {
  theme: MD3Theme
  schema: ThemeEnum
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeType | null>(null)

export function useTheme(): ThemeType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

function useThemeProvider() {
  const [themeSchema, setThemeSchema] = useState<ThemeEnum>(ThemeEnum.Light)

  useEffect(() => {
    const loadTheme = async () => {
      const theme = await getThemeAsync()
      setThemeSchema(theme)
    }
    loadTheme()
  }, [])

  const toggleTheme = () => {
    const newTheme = themeSchema === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light
    setThemeSchema(newTheme)
    setThemeAsync(newTheme)
  }

  return {schema: themeSchema, toggleTheme}
}

async function getThemeAsync() {
  try {
    const theme = (await AsyncStorage.getItem('theme')) as ThemeEnum | null
    return theme ?? ThemeEnum.Light
  } catch (error) {
    console.error('Error reading theme from storage', error)
    return ThemeEnum.Light
  }
}

async function setThemeAsync(theme: ThemeEnum) {
  try {
    await AsyncStorage.setItem('theme', theme)
  } catch (error) {
    console.error('Error saving theme to storage', error)
  }
}
