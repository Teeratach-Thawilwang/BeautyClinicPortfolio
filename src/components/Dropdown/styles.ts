import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme, width: number) {
  return StyleSheet.create({
    container: {
      minWidth: 200,
      height: 40,
      paddingLeft: 16,
      paddingRight: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contentContainer: {
      marginTop: 5,
      width: width,
      maxWidth: width,
      paddingVertical: 0,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      overflow: 'hidden',
    },
    placeholder: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      flex: 1,
    },
    item: {
      height: 50,
      maxWidth: width,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    itemSelected: {
      height: 50,
      maxWidth: width,
      backgroundColor: theme.colors.surfaceContainerLow,
    },
    itemContent: {
      maxWidth: width,
    },
  })
}
