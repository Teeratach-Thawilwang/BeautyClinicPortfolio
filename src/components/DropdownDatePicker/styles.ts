import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      width: 200,
      height: 50,
      paddingLeft: 20,
      paddingRight: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
