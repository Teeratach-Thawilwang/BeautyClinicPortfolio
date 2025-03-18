import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeInterface'

export default (theme: AdaptiveMD3Theme, isSignIn: boolean) => {
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
    cardContainer: {
      backgroundColor: theme.colors.surfaceContainer,
    },
    flexRowContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 100,
    },
    profileTextContainer: {
      marginLeft: 10,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
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
      backgroundColor: theme.colors.surfaceContainer,
    },
    signOutLabel: {
      color: theme.colors.onSurface,
    },
  })
}
