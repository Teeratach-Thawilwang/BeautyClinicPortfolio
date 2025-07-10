import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingBottom: 10,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: 10,
      gap: 10,
    },
    headerBar: {
      height: 50,
    },
    buttonContainer: {
      marginTop: 'auto',
      marginBottom: 0,
      borderRadius: 50,
    },
    buttonLabel: {},
    validateError: {
      color: theme.colors.error,
      fontSize: theme.fontSize.body,
      textAlign: 'center',
    },
  })
}
