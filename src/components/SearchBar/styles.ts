import {StyleSheet} from 'react-native'

import {useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {width, responsive} = useResponsiveScreen()
  return StyleSheet.create({
    style: {
      width: responsive == 'MOBILE' ? '100%' : width * 0.8 - 110 - 30,
      height: 40,
      fontSize: theme.fontSize.label,
      backgroundColor: theme.colors.inverseOnSurface,
    },
    content: {
      marginLeft: 45,
      marginRight: 40,
      paddingVertical: 10,
    },
  })
}
