import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonBox: {
      marginTop: 'auto',
      marginBottom: 10,
      gap: 10,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.fontSize.body,
      textAlign: 'center',
    },
    backButtonContainer: {
      borderRadius: 50,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    backLabel: {
      color: theme.colors.onSurface,
    },
    buttonContainer: {
      borderRadius: 50,
    },
  })
}
