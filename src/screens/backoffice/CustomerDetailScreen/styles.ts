import {StyleSheet} from 'react-native'

import {useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {responsive} = useResponsiveScreen()
  const itemMarginTop = responsive == 'MOBILE' ? 10 : 20
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    skeletonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}
