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
    marginTop: {
      marginTop: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    flexBetween: {
      justifyContent: 'space-between',
    },
    labelBold: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    body: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
    },
    fieldNote: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.note,
    },
    valueNote: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.note,
      fontWeight: 'bold',
    },
    devider: {
      marginVertical: 10,
      height: 1.5,
      borderColor: theme.colors.outline,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 5,
    },
    courseContainer: {
      height: '100%',
      marginLeft: 10,
      flex: 1,
      justifyContent: 'flex-start',
      gap: 5,
    },
    status: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },
    buttonContainer: {
      marginTop: 10,
      borderRadius: 50,
    },
  })
}
