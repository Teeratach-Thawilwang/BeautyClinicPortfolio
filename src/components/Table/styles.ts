import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme, isLoading?: boolean) {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      overflow: 'hidden',
    },
    header: {
      padding: 10,
      height: 50,
      backgroundColor: theme.colors.surfaceContainerHigh,
      gap: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerCell: {
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
    row: {
      paddingHorizontal: 10,
      backgroundColor: isLoading ? 'transparent' : theme.colors.surface,
      borderBottomWidth: 1,
      borderColor: theme.colors.surfaceVariant,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowLastChild: {
      paddingHorizontal: 10,
      backgroundColor: isLoading ? 'transparent' : theme.colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowCell: {
      height: 50,
      textAlignVertical: 'center',
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
      textAlign: 'center',
      flex: 1,
    },
  })
}
