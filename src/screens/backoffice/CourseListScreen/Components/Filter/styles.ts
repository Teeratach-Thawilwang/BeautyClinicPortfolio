import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 20,
      marginTop: 20,
    },
    createButtonContainer: {
      width: 110,
      borderRadius: 10,
    },
    createButtonIcon: {
      width: 16,
      color: theme.colors.onPrimary,
    },
    filterButtonContainer: {
      marginLeft: 'auto',
      marginRight: 0,
      width: 100,
      borderRadius: 10,
      borderColor: theme.colors.onSurfaceVariant,
    },
    filterButtonLabel: {
      color: theme.colors.onSurface,
    },
    filterButtonIcon: {
      width: 20,
      color: theme.colors.onSurface,
    },
    filterItemContainer: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
      gap: 10,
    },
    filterItemLabel: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    bottomSheetSpaceBotton: {
      height: 20,
    },
  })
}
