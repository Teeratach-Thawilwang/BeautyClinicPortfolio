import {StyleSheet, ViewStyle} from 'react-native'

import {AdaptiveMD3Theme} from '@models/ThemeTypes'

export function getStyles(
  theme: AdaptiveMD3Theme,
  containerStyle: any,
  height: number,
  iconStyle: any,
  iconDisableStyle: any,
  buttonContainerStyle: any,
  activeButtonStyle: any,
  inactiveButtonStyle: any,
) {
  const buttonContainer: ViewStyle = {
    maxWidth: 200,
    minWidth: 0,

    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.surfaceVariant,
    backgroundColor: theme.colors.surfaceContainerHigh,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }
  return StyleSheet.create({
    container: {
      height: height,
      marginTop: 10,
      marginBottom: 10,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
      ...containerStyle,
    },
    icon: {
      width: 20,
      color: theme.colors.onSurface,
      ...iconStyle,
    },
    iconDisable: {
      width: 20,
      color: theme.colors.onSurfaceDisabled,
      ...iconDisableStyle,
    },
    label: {
      width: height,
      minWidth: 0,
      color: theme.colors.onSurface,
      fontSize: theme.fontSize.label,
    },
    labelDisable: {
      color: theme.colors.onSurfaceDisabled,
      fontSize: theme.fontSize.label,
    },
    buttonFlexRowReverse: {
      flexDirection: 'row-reverse',
    },
    buttonContainer: {
      ...buttonContainer,
      ...buttonContainerStyle,
    },
    activeButton: {
      ...buttonContainer,
      width: height,
      borderWidth: 1,
      backgroundColor: theme.colors.surfaceContainerHigh,
      ...activeButtonStyle,
    },
    inactiveButton: {
      ...buttonContainer,
      width: height,
      borderWidth: 0,
      backgroundColor: theme.colors.surface,
      ...inactiveButtonStyle,
    },
  })
}
