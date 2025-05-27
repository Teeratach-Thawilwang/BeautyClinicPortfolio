import {MD3Theme} from 'react-native-paper'

// State Interface
export interface ThemeSliceInterface {
  theme: ThemeEnum | null
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
