import {StyleSheet} from 'react-native'

import {useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {responsive} = useResponsiveScreen()
  return StyleSheet.create({
    container: {
      marginTop: 20,
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    flexContainer: {
      marginTop: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: responsive === 'MOBILE' ? 'space-between' : 'flex-start',
      alignItems: 'flex-start',
      gap: responsive === 'MOBILE' ? 10 : 20,
    },
    itemContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
    },
    itemImage: {
      width: 70,
      height: 70,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    itemText: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
    },
  })
}
