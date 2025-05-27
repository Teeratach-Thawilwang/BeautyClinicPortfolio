import React from 'react'
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native'
import {IconButton} from 'react-native-paper'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

export default function TableCardPagination({
  current,
  last,
  onPress,
  containerStyle,
  height = 50,
  iconStyle,
  iconDisableStyle,
  buttonContainerStyle,
  activeButtonStyle,
  inactiveButtonStyle,
}: {
  current: number
  last: number
  onPress: (page: number) => void
  containerStyle?: any
  height?: number
  iconStyle?: any
  iconDisableStyle?: any
  buttonContainerStyle?: any
  activeButtonStyle?: any
  inactiveButtonStyle?: any
}) {
  const {theme} = useTheme()
  const styles = getStyles(
    theme,
    containerStyle,
    height,
    iconStyle,
    iconDisableStyle,
    buttonContainerStyle,
    activeButtonStyle,
    inactiveButtonStyle,
  )

  return (
    <View style={styles.container}>
      <IconButton
        icon='arrow-left'
        iconColor={current == 1 ? styles.iconDisable.color : styles.icon.color}
        style={styles.icon}
        size={20}
        onPress={() => {
          if (current > 1) {
            onPress(current - 1)
          }
        }}
      />

      <Button
        containerStyle={
          current == 1 ? styles.activeButton : styles.inactiveButton
        }
        contentStyle={styles.buttonContent}
        labelStyle={styles.label}
        onPress={() => {
          if (current != 1) {
            onPress(1)
          }
        }}>
        1
      </Button>

      {last > 2 && current != 1 && current != last ? (
        <Button
          containerStyle={styles.activeButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.label}
          onPress={() => {
            if (last > 2 && current != 1 && current != last) {
              onPress(current)
            }
          }}>
          {current.toString()}
        </Button>
      ) : (
        <></>
      )}

      {last > 1 ? (
        <Button
          containerStyle={
            current == last ? styles.activeButton : styles.inactiveButton
          }
          labelStyle={styles.label}
          onPress={() => {
            if (current != last) {
              onPress(last)
            }
          }}>
          {last.toString()}
        </Button>
      ) : (
        <></>
      )}

      <IconButton
        icon='arrow-right'
        iconColor={
          current == last ? styles.iconDisable.color : styles.icon.color
        }
        style={styles.icon}
        size={20}
        onPress={() => {
          if (current < last) {
            onPress(current + 1)
          }
        }}
      />
    </View>
  )
}

function getStyles(
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
      fontSize: theme.fonts.titleMedium.fontSize,
    },
    labelDisable: {
      color: theme.colors.onSurfaceDisabled,
      fontSize: theme.fonts.titleMedium.fontSize,
    },
    buttonContent: {
      width: '100%',
      height: '100%',
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
