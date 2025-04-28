import {StyleSheet} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

export function getStyles() {
  const {theme} = useTheme()
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    forgotPasswordContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    forgotPasswordLabel: {
      padding: 0,
      color: theme.colors.primary,
      fontSize: theme.fontSize.label,
    },
  })
}
