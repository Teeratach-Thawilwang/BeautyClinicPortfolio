import React, {useCallback, useState} from 'react'
import {View} from 'react-native'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function ButtonGroupChoice({
  choices,
  onChange,
  initialValue,
  containerStyle,
  buttonGroupStyle,
  activeButtonColor,
  activeLabelColor,
  disabledColor,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [value, setValue] = useState(initialValue ?? '')

  const onPressHandler = useCallback((value: string) => {
    setValue(value)
    onChange(value)
  }, [])

  return (
    <View style={[styles.container, containerStyle]}>
      {choices.map((item, index) => (
        <Button
          key={index}
          mode={item.value == value ? 'contained' : 'text'}
          icon={item.icon}
          containerStyle={[
            styles.button,
            index == 0 ? styles.buttonLeft : null,
            buttonGroupStyle?.borderColor
              ? {borderColor: buttonGroupStyle?.borderColor}
              : null,
            item.value == value
              ? activeButtonColor
                ? {backgroundColor: activeButtonColor}
                : styles.buttonColorActive
              : {backgroundColor: 'transparent'},
          ]}
          labelStyle={
            item.value == value
              ? activeLabelColor
                ? {color: activeLabelColor}
                : styles.labelActive
              : item.disabled
                ? disabledColor
                  ? {color: disabledColor}
                  : styles.labelDisabled
                : styles.label
          }
          iconStyle={
            item.disabled && disabledColor
              ? {width: 20, color: disabledColor}
              : undefined
          }
          onPress={() => onPressHandler(item.value)}
          disabled={item.disabled}>
          {item.label}
        </Button>
      ))}
    </View>
  )
}
