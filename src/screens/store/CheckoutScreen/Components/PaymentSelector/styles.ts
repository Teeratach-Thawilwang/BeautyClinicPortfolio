import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    title: {
      marginBottom: 10,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    accordionContainer: {
      paddingVertical: 0,
      paddingRight: 6,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    accordionTitle: {
      marginLeft: -16,
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
      fontWeight: 'bold',
    },
    checkbox: {
      height: 48,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    checkboxLabel: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
    checkboxMarginLeft: {
      marginLeft: 20,
    },
    creditCardImageContainer: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      marginRight: 10,
    },
    creditCardImage: {
      width: 27,
      height: 16,
    },
    mobileImageContainer: {
      marginRight: 10,
    },
  })
}
