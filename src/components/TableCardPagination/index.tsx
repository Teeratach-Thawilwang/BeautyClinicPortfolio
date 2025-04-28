import React from 'react'
import {View} from 'react-native'
import {IconButton} from 'react-native-paper'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

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
