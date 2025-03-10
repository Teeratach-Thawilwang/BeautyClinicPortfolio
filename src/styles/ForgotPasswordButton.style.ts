import {StyleSheet} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

export default () => {
  const {theme} = useTheme()
  return StyleSheet.create({
    container: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      padding: 0,
      color: theme.colors.primary,
      fontSize: theme.fonts.titleMedium.fontSize,
    },
  })
}
