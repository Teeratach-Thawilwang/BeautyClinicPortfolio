import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme, width: number) {
  return StyleSheet.create({
    container: {
      width: width,
      height: 50,
      paddingLeft: 20,
      paddingRight: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contentContainer: {
      marginTop: 5,
      maxHeight: 200,
      minWidth: width,
      maxWidth: 2 * width,
      padding: 0,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    placeholder: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    item: {
      height: 50,
      minWidth: width,
      maxWidth: 2 * width,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    itemSelected: {
      height: 50,
      minWidth: width,
      maxWidth: 2 * width,
      backgroundColor: theme.colors.surfaceContainerLow,
    },
    itemContent: {
      minWidth: width,
      maxWidth: 2 * width,
    },
  })
}
