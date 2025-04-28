import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginHorizontal: 20,
      color: theme.colors.onSurfaceVariant,
    },
    devider: {
      height: 1.5,
      flex: 1,
      borderColor: theme.colors.onSurface,
    },
  })
}
