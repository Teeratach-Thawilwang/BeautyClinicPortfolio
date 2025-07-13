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
    detailContainer: {
      height: 60,
      flex: 1,
      justifyContent: 'space-between',
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 5,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    text: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    deviderContent: {
      marginVertical: 10,
      height: 1.5,
      borderColor: theme.colors.onSurface,
    },
    buttonBox: {
      flex: 2,
      flexDirection: 'row',
      gap: 20,
    },
    editButtonContainer: {
      flex: 1,
      borderRadius: 50,
      backgroundColor: theme.colors.secondary,
    },
    editButtonLabel: {
      color: theme.colors.onSecondary,
    },
    cancelButtonContainer: {
      flex: 1,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surfaceContainerHighest,
    },
    cancelButtonLabel: {
      color: theme.colors.onSurface,
    },
  })
}
