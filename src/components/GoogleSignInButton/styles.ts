import {StyleSheet} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

export function getStyles() {
  const {theme} = useTheme()
  return StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: '#fff',
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 100,
      justifyContent: 'center',
    },
    content: {
      paddingVertical: 3,
    },
    label: {
      color: '#373737',
      fontSize: theme.fontSize.label,
    },
    icon: {
      width: 20,
      height: 20,
    },
  })
}
