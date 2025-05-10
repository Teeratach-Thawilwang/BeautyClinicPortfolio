import {StyleSheet} from 'react-native'

import {useResponsiveScreen} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(theme: AdaptiveMD3Theme) {
  const {responsive} = useResponsiveScreen()
  const itemMarginTop = responsive == 'MOBILE' ? 10 : 20
  const maxWidthButton = responsive == 'MOBILE' ? '100%' : 150
  return StyleSheet.create({
    container: {
      marginVertical: 10,
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
    flexBox: {
      gap: 20,
    },
    inputItem: {
      marginTop: itemMarginTop,
    },
    inputDescription: {
      marginTop: itemMarginTop,
      height: 100,
    },
    dropdownLabel: {
      marginTop: 10,
      marginBottom: 5,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.body,
      flex: 1,
    },
    dropdownErrorLabel: {
      marginTop: 10,
      marginBottom: 5,
      color: theme.colors.error,
      fontSize: theme.fontSize.body,
      flex: 1,
    },
    dropdownContainer: {
      backgroundColor: theme.colors.surfaceContainerHighest,
    },
    dropdownErrorContainer: {
      backgroundColor: theme.colors.surfaceContainerHighest,
      borderColor: theme.colors.error,
      borderWidth: 2,
    },
    imagePicker: {
      marginTop: itemMarginTop,
    },
    imagePickerTitle: {
      marginTop: 10,
      fontSize: theme.fontSize.label,
    },
    imagePickerBox: {
      width: 95,
      height: 95,
    },
    timeBoxTitle: {
      marginTop: 10,
      fontSize: theme.fontSize.body,
    },
    formErrorText: {
      marginTop: 5,
      paddingHorizontal: 10,
      color: theme.colors.error,
      fontSize: theme.fontSize.body,
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
