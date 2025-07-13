import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    },
    logoContainer: {
      padding: 10,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#89D6B9',
      alignSelf: 'center',
    },
    logoImage: {
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      borderRadius: 50,
    },
    buttonLabel: {
      fontSize: theme.fontSize.label,
    },
  })
}
