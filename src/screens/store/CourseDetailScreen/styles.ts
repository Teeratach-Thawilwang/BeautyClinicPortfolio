import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingBottom: 10,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      paddingBottom: 10,
    },
    headerBar: {
      height: 50,
    },
    TextContainer: {
      marginTop: 20,
    },
    title: {
      marginBottom: 10,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.title,
      fontWeight: 'bold',
    },
    text: {
      marginBottom: 4,
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
    buttonContainer: {
      borderRadius: 50,
      // backgroundColor: theme.colors.secondaryContainer,
    },
    buttonLabel: {
      // color: theme.colors.onSecondaryContainer,
    },
  })
}
