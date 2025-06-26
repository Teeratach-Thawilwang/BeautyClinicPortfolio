import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingBottom: 5,
      width: 150,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
      boxShadow: `1 2 7 -2 ${theme.colors.onSurface}80`,
    },
    image: {
      width: 150,
      height: 100,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      resizeMode: 'cover',
    },
    detailContainer: {
      marginTop: 10,
      paddingHorizontal: 10,
    },
    devider: {
      marginVertical: 5,
      height: 1.5,
      borderColor: theme.colors.onSurface,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
      fontWeight: 'bold',
    },
    text: {
      marginBottom: 2,
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.note,
    },
  })
}
