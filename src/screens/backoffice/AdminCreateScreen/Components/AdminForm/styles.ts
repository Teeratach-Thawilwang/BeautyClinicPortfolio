import {StyleSheet} from 'react-native'

import {useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {responsive} = useResponsiveScreen()
  const maxWidthButton = responsive == 'MOBILE' ? '100%' : 150
  return StyleSheet.create({
    container: {
      marginVertical: 10,
      flex: 1,
      gap: 10,
    },
    cardContainer: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
      padding: 20,
      backgroundColor: theme.colors.surfaceContainerLow,
    },
    cardTitle: {
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    submitErrorText: {
      color: theme.colors.error,
      fontSize: theme.fontSize.body,
    },
    buttonContainer: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,

      position: responsive === 'MOBILE' ? 'absolute' : 'relative',
      bottom: responsive === 'MOBILE' ? 10 : undefined,
    },
    submitButtonContainer: {
      maxWidth: maxWidthButton,
      flex: 1,
      borderRadius: 5,
    },
    cancelButtonContainer: {
      maxWidth: maxWidthButton,
      flex: 1,
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    cancelButtonLabel: {
      color: theme.colors.onSurface,
    },
  })
}
