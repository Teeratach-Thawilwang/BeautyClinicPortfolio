import React from 'react'
import {StyleSheet, View, ViewStyle} from 'react-native'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

export default function TablePagination({
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
  const labelMiddlePosition = getLabelMiddlePosition()

  function getLabelMiddlePosition() {
    if (current > 3 && current < last - 2) {
      return current
    }
    if (current >= last - 2 && last >= 5) {
      return last - 2
    }
    return 3
  }

  return (
    <View style={styles.container}>
      <Button
        icon='arrow-left'
        iconStyle={current > 1 ? styles.icon : styles.iconDisable}
        containerStyle={styles.buttonContainer}
        labelStyle={current > 1 ? styles.label : styles.labelDisable}
        onPress={() => {
          if (current > 1) {
            onPress(current - 1)
          }
        }}>
        Previous
      </Button>

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

      {last > 2 ? (
        <Button
          containerStyle={
            current == 2 ? styles.activeButton : styles.inactiveButton
          }
          contentStyle={styles.buttonContent}
          labelStyle={styles.label}
          onPress={() => {
            const isDotRange = current > 3 && last > 5
            if (!isDotRange && current != 2) {
              onPress(2)
            }
          }}>
          {current > 3 && last > 5 ? '...' : '2'}
        </Button>
      ) : (
        <></>
      )}

      {last > 3 ? (
        <Button
          containerStyle={
            (current > 2 && current <= last - 2) || current == 3
              ? styles.activeButton
              : styles.inactiveButton
          }
          contentStyle={styles.buttonContent}
          labelStyle={styles.label}
          onPress={() => {
            const isRangeValid = current > 2 && current <= last - 2
            const isEqualTo3 = current == 3
            if (!(isRangeValid || isEqualTo3)) {
              onPress(labelMiddlePosition)
            }
          }}>
          {labelMiddlePosition.toString()}
        </Button>
      ) : (
        <></>
      )}

      {last > 4 ? (
        <Button
          containerStyle={
            current == last - 1 ? styles.activeButton : styles.inactiveButton
          }
          contentStyle={styles.buttonContent}
          labelStyle={styles.label}
          onPress={() => {
            const isDotRange = current < last - 2 && last > 5
            if (!isDotRange && current != last - 1) {
              onPress(last - 1)
            }
          }}>
          {current < last - 2 && last > 5 ? '...' : (last - 1).toString()}
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
          onPress={() => onPress(last)}>
          {last.toString()}
        </Button>
      ) : (
        <></>
      )}

      <Button
        icon='arrow-right'
        iconStyle={current < last ? styles.icon : styles.iconDisable}
        containerStyle={styles.buttonContainer}
        contentStyle={styles.buttonFlexRowReverse}
        labelStyle={current < last ? styles.label : styles.labelDisable}
        onPress={() => {
          if (current < last) {
            onPress(current + 1)
          }
        }}>
        Next
      </Button>
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
  return StyleSheet.create({
    container: {
      height: height,
      marginBottom: 20,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 20,
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
