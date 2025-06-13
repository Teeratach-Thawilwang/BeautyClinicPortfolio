import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    row: {
      flexDirection: 'row',
    },
    marginTop: {
      marginTop: 10,
    },
    iconButton: {
      width: 20,
      height: 20,
      marginLeft: 'auto',
      marginRight: 10,
    },
    usageRound: {
      marginTop: 10,
      flex: 2,
      flexDirection: 'row',
    },
    usageRoundItem: {
      flex: 1,
      flexDirection: 'row',
    },
    fleidText: {
      marginRight: 10,
      fontSize: theme.fontSize.body,
      color: theme.colors.onSurfaceVariant,
      verticalAlign: 'middle',
    },
    labelText: {
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      verticalAlign: 'middle',
    },
    imageContainer: {
      marginRight: 10,
      justifyContent: 'center',
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
    },
  })
}
