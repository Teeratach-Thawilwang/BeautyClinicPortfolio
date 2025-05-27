import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme, height: number) {
  return StyleSheet.create({
    container: {},
    errorText: {
      marginTop: 5,
      paddingHorizontal: 10,
      color: theme.colors.error,
      fontSize: theme.fontSize.body,
    },
    textInput: {
      height: height,
      fontSize: theme.fontSize.label,
      color: theme.colors.onSurface,
      backgroundColor: theme.colors.inverseOnSurface,
    },
    label: {
      marginTop: 10,
      marginBottom: 5,
      fontSize: theme.fontSize.body,
      fontWeight: 'normal',
      color: theme.colors.onSurface,
    },
  })
}
