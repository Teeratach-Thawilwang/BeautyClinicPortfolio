import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(
  theme: AdaptiveMD3Theme,
  responsive: 'MOBILE' | 'TABLET' | 'DESKTOP',
) {
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
      justifyContent:
        responsive === 'MOBILE' ? 'space-between' : 'space-evenly',
      alignItems: 'flex-start',
      gap: responsive === 'MOBILE' ? 10 : 20,
    },
    itemContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 5,
    },
    itemImage: {
      width: responsive === 'MOBILE' ? 70 : 120,
      height: responsive === 'MOBILE' ? 70 : 120,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    itemText: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
    },
  })
}
