import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      width: '100%',
      gap: 5,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    note: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: 10,
    },
    imageBox: {
      width: 100,
      height: 100,
      borderRadius: 8,
      position: 'relative',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    removeIcon: {
      margin: 5,
      width: 22,
      height: 22,
      color: theme.colors.onSurface,

      position: 'absolute',
      top: 0,
      right: 0,
    },
    buttonContainer: {
      width: 100,
      height: 100,
      borderRadius: 8,
      overflow: 'hidden',
    },
    button: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.primary,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: theme.fontSize.body,
      fontWeight: '500',
      color: theme.colors.onPrimary,
    },
    buttonIcon: {
      width: 50,
      color: theme.colors.onPrimary,
    },
  })
}
