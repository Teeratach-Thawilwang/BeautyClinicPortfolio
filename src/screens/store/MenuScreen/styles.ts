import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme, isSignIn: boolean) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: isSignIn ? 'space-between' : 'flex-start',
    },
    logoContainer: {
      marginTop: 20,
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
  })
}
