import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingLeft: 20,
      paddingRight: 10,
      height: 50,
      borderWidth: 0,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    text: {
      flexGrow: 1,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    iconLeft: {
      marginRight: 10,
    },
  })
}
