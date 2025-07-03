import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 5,
    },
    detailContainer: {
      flexGrow: 1,
      gap: 2,
    },
    devider: {
      width: '100%',
      marginVertical: 5,
      height: 1.5,
      borderColor: theme.colors.onSurface,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    text: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
    textCategoryContainer: {
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textCategory: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 5,
      color: theme.colors.onPrimaryContainer,
      backgroundColor: theme.colors.primaryContainer,
      fontSize: theme.fontSize.body,
    },
  })
}
