import {StyleSheet} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    filterItemContainer: {
      padding: 10,
      borderBottomColor: theme.colors.outlineVariant,
      gap: 10,
    },
    filterItemLabel: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    buttomChoiceContainer: {
      height: 36,
      backgroundColor: theme.colors.surfaceContainerHighest,
    },
    activeButtomChoiceContainer: {
      height: 36,
    },
    bottomSheetHeader: {
      padding: 10,
      position: 'relative',
    },
    bottomSheetTitle: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.subtitle,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    bottomSheetCloseIcon: {
      width: 20,
      position: 'absolute',
      top: 0,
      right: 10,
    },
    bottomSheetButtons: {
      marginTop: 20,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
      backgroundColor: theme.colors.surfaceContainerLow,
    },
    resetButtonContainer: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      flexGrow: 1,
    },
    resetButtonLabel: {
      color: theme.colors.onSurface,
    },
    confirmButtonContainer: {
      flexGrow: 1,
    },
  })
}
