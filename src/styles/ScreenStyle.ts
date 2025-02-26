import {StyleSheet} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

export default () => {
  const {theme} = useTheme()
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
  })
}
