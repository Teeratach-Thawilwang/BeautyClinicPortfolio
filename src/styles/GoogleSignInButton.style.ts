import {StyleSheet} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

export default () => {
  const {theme} = useTheme()
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 100,
    },
    content: {
      paddingVertical: 3,
    },
    label: {
      color: '#373737',
      fontSize: theme.fonts.titleMedium.fontSize,
    },
    icon: {
      width: 20,
      height: 20,
    },
  })
}
