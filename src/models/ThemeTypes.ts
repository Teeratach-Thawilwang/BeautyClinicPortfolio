import {MD3Theme} from 'react-native-paper'

// State Interface
export type ThemeSlice = {
  theme: ThemeEnum | null
}

export enum ThemeEnum {
  Light = 'light',
  Dark = 'dark',
}

export type AdaptiveMD3Theme = {
  colors: {
    quaternary: string
    onQuaternary: string
    quaternaryContainer: string
    OnQuaternaryContainer: string
    surfaceContainerLowest: string
    surfaceContainerLow: string
    surfaceContainer: string
    surfaceContainerHigh: string
    surfaceContainerHighest: string
  } & MD3Theme['colors']
  fontSize: {
    displayLarge: number
    displayMedium: number
    displaySmall: number
    headline: number
    title: number
    subtitle: number
    label: number
    body: number
    note: number
  }
} & MD3Theme

export type ThemeType = {
  theme: AdaptiveMD3Theme
  schema: ThemeEnum
  toggleTheme: () => void
}
