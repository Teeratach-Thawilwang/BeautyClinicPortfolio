import React from 'react'
import {View} from 'react-native'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

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
}: Props) {
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
        iconPosition='right'
        containerStyle={styles.buttonContainer}
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
