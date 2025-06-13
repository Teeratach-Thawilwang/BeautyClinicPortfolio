import {StyleSheet} from 'react-native'

import {useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {responsive} = useResponsiveScreen()
  return StyleSheet.create({
    container: {
      marginVertical: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      padding: 20,
      backgroundColor: theme.colors.surfaceContainerLow,
    },
    skeletonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexBox: {
      gap: 20,
    },
    title: {
      marginBottom: responsive === 'MOBILE' ? 0 : 20,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    marginTop: {
      marginTop: 20,
    },
    noDataContainer: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      backgroundColor: theme.colors.surfaceContainerHigh,
      overflow: 'hidden',
    },
    noData: {
      height: 50,
      textAlign: 'center',
      lineHeight: 50,
      color: theme.colors.onSurfaceVariant,
      fontSize: theme.fontSize.label,
      fontWeight: 'bold',
    },
    paginateContainer: {},
    paginate: {
      marginBottom: 0,
    },
  })
}
