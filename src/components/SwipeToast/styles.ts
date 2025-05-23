import {StyleSheet} from 'react-native'

import {useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {width} = useResponsiveScreen()
  return StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      maxWidth: width >= 500 ? 500 : '90%',
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 10,
    },
    textContainer: {
      flexShrink: 1,
    },
    text1: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: '500',
    },
    text2: {
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.body,
    },
  })
}
