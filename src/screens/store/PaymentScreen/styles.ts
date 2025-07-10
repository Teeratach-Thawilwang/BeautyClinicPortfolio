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
      paddingBottom: 10,
    },
    headerText: {
      height: 50,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    buttonBox: {
      marginTop: 'auto',
      marginBottom: 0,
      flexDirection: 'row',
      gap: 20,
    },
    buttonContainer: {
      flex: 1,
    },
    buttonLabel: {
      fontSize: theme.fontSize.body,
    },
  })
}
