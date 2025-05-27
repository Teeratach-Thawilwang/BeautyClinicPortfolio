import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet} from 'react-native'

import {useResponsiveScreen} from '@hooks/CommonHooks'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {width, responsive} = useResponsiveScreen()
  return StyleSheet.create({
    style: {
      width: responsive == 'MOBILE' ? '100%' : width * 0.8 - 110 - 60,
      height: 50,
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
