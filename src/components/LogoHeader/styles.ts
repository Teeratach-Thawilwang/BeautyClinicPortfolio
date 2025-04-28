import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme, allowBack: boolean) {
  return StyleSheet.create({
    container: {
      marginTop: allowBack ? 5 : 30,
      marginBottom: 30,
      backgroundColor: theme.colors.background,
      position: 'relative',
    },
    backIcon: {
      top: 0,
      left: -18,
    },
    imageContainer: {
      width: 115,
      height: 115,
      borderRadius: 100,
      backgroundColor: '#89D6B9',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    image: {
      width: 80,
      height: 80,
    },
    textContainer: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    textLeft: {
      color: theme.colors.outline,
      fontSize: theme.fontSize.label,
    },
    textRight: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
  })
}
