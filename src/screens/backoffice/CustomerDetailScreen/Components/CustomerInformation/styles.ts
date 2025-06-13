import {StyleSheet} from 'react-native'

import {useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {responsive} = useResponsiveScreen()
  const itemMarginTop = responsive == 'MOBILE' ? 10 : 20
  return StyleSheet.create({
    container: {
      marginTop: 10,
      padding: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceContainerLow,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    flexBox: {
      gap: 20,
    },
    inputItem: {
      marginTop: itemMarginTop,
    },
  })
}
