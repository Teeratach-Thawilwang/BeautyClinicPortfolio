import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    skeletonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    createButtonIcon: {
      width: 16,
      color: theme.colors.onPrimary,
    },
    searchInput: {
      marginTop: 10,
    },
  })
}
