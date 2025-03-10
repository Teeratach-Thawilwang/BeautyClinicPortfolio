import {StyleSheet} from 'react-native'
import {MD3Theme} from 'react-native-paper'

export default (theme: MD3Theme, isSignIn: boolean) => {
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
    flexRowContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    profileTextContainer: {
      marginLeft: 10,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 100,
    },
    ProfileName: {
      fontWeight: 'bold',
      fontSize: theme.fonts.titleMedium.fontSize,
      color: theme.colors.onSurface,
    },
    ProfileEmail: {
      color: theme.colors.onSurfaceVariant,
    },
    signInContainer: {
      marginBottom: 20,
    },
    cardSignOut: {
      marginTop: 'auto',
      marginBottom: 20,
    },
    signOutContainer: {
      borderRadius: 0,
    },
    signOutLabel: {
      color: theme.colors.error,
    },
  })
}
