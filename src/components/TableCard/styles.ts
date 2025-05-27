import {StyleSheet, ViewStyle} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme, isLoading?: boolean) {
  const row: ViewStyle = {
    backgroundColor: isLoading ? 'transparent' : theme.colors.surface,
    borderBottomWidth: 1,
    borderColor: theme.colors.surfaceVariant,
    flexDirection: 'row',
    alignItems: 'flex-start',
  }

  return StyleSheet.create({
    container: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      overflow: 'hidden',
    },
    noData: {
      height: 50,
      textAlign: 'center',
      lineHeight: 50,
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    row: {
      ...row,
    },
    rowLastChild: {
      ...row,
      borderBottomWidth: 0,
    },
    header: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: '100%',
      borderRightWidth: 1,
      borderRightColor: theme.colors.surfaceVariant,
      backgroundColor: isLoading
        ? 'transparent'
        : theme.colors.surfaceContainerHigh,
      gap: 10,
    },
    headerCell: {
      fontSize: theme.fontSize.body,
      fontWeight: 'bold',
      textAlign: 'left',
      flex: 1,
    },
    content: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      height: '100%',
      gap: 10,
    },
    contentCell: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
      textAlign: 'left',
      flex: 1,
    },
    iconContainer: {
      paddingHorizontal: 5,
      marginLeft: 'auto',
      alignSelf: 'center',
    },
  })
}
