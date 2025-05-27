import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      width: 200,
      marginVertical: 20,
      paddingVertical: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentContainer: {
      margin: 0,
      padding: 0,
      width: 300,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      overflow: 'hidden',
    },
    placeholder: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    iconButton: {
      width: 20,
      height: 20,
      margin: 0,
    },
  })
}
