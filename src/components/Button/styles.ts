import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      height: 50,
      borderRadius: 5,
      justifyContent: 'center',
    },
    content: {
      height: '100%',
    },
    label: {
      height: '100%',
      textAlignVertical: 'center',
      fontSize: theme.fontSize.body,
    },
    flexReverse: {
      flexDirection: 'row-reverse',
    },
    skeleton: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
  })
}
