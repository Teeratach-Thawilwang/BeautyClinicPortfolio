import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginVertical: 5,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceContainerHighest,
    },
    contentContainer: {
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
      flex: 1,
      gap: 2,
    },
    devider: {
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
    deviderContent: {
      marginVertical: 10,
      height: 1.5,
      borderColor: theme.colors.onSurface,
    },
    buttonContainer: {
      borderRadius: 50,
    },
  })
}
