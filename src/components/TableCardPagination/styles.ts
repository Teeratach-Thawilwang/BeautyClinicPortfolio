import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import {StyleSheet, TextStyle, ViewStyle} from 'react-native'

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
    maxWidth: 150,
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
  const icon: ViewStyle | TextStyle = {
    width: height,
    height: height,
    margin: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.surfaceVariant,

    color: theme.colors.onSurface,
    backgroundColor: theme.colors.surfaceContainerHigh,
  }

  return StyleSheet.create({
    container: {
      height: height,
      marginBottom: 20,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      ...containerStyle,
    },
    icon: {
      ...icon,
      ...iconStyle,
    },
    iconDisable: {
      ...icon,
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
