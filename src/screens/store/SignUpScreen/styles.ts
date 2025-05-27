import {StyleSheet} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

export function getStyles() {
  const {theme} = useTheme()
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    inlineTextLink: {
      marginTop: 10,
    },
  })
}
