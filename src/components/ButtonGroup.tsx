import React, {useCallback, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from 'react-native-paper'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

type DataType = {
  label: string
  value: string
}

export default function ButtonGroup({
  data,
  onChange,
  placeholder,
  initialValue,
  containerStyle,
  placeholderStyle,
  buttonGroupStyle,
  activeButtonColor,
  activeLabelColor,
}: {
  data: DataType[]
  onChange: (value: string) => void
  placeholder?: string
  initialValue?: string
  containerStyle?: any
  placeholderStyle?: any
  buttonGroupStyle?: any
  activeButtonColor?: string
  activeLabelColor?: string
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [value, setValue] = useState(initialValue ?? '')

  const onPressHandler = useCallback((value: string) => {
    setValue(value)
    onChange(value)
  }, [])

  return (
    <View style={[styles.container, containerStyle]}>
      {placeholder ? (
        <Text style={[styles.placeholder, placeholderStyle]}>
          {placeholder}
        </Text>
      ) : null}
      <View style={styles.buttonGroup}>
        {data.map((item, index) => {
          return (
            <Button
              key={index}
              mode={item.value == value ? 'contained' : 'outlined'}
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
                  : 'transparent',
              ]}
              labelStyle={
                item.value == value
                  ? activeLabelColor
                    ? {color: activeLabelColor}
                    : styles.labelActive
                  : styles.label
              }
              onPress={() => onPressHandler(item.value)}>
              {item.label}
            </Button>
          )
        })}
      </View>
    </View>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
    },
    placeholder: {
      color: theme.colors.onSurface,
      fontSize: theme.fonts.titleMedium.fontSize,
    },
    buttonGroup: {
      marginVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    button: {
      flexGrow: 1,
      borderWidth: 0,
      borderRadius: 0,
      borderLeftWidth: 1,
      borderColor: theme.colors.outline,
    },
    buttonLeft: {
      borderLeftWidth: 0,
    },
    buttonColorActive: {
      backgroundColor: theme.colors.primary,
    },
    label: {
      color: theme.colors.primary,
    },
    labelActive: {
      color: theme.colors.onPrimary,
    },
  })
}
