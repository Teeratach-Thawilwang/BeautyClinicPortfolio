import {AdaptiveMD3Theme} from '@models/ThemeTypes'
import React, {useState} from 'react'
import {View} from 'react-native'
import {Text, TextInput as TextInputRNP} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {ColorStyle, Props} from './types'

export default function TextInput({
  label,
  value,
  onChange,
  mode,
  placeholder,
  icon,
  error,
  secureText,
  disabled,
  containerStyle,
  labelStyle,
  colorStyle,
}: Props) {
  const inputHeight = Number(containerStyle?.height ?? 50)
  const borderRadius = Number(containerStyle?.borderRadius ?? 5)
  const {theme} = useTheme()
  const styles = getStyles(theme, inputHeight)
  const [isSecureText, setIsSecureText] = useState(secureText ?? false)
  const [isFocus, setIsFocus] = useState(false)
  const iconName = isSecureText ? 'eye-outline' : 'eye-off-outline'
  const labelColor = getLineColor(isFocus, error, disabled, theme, colorStyle)

  return (
    <View style={[styles.container, containerStyle]}>
      {mode == 'labelTop' ? (
        <Text
          style={[
            styles.label,
            {color: labelColor},
            {fontSize: labelStyle?.fontSize},
            labelStyle?.fontWeight ? {fontWeight: labelStyle.fontWeight} : {},
          ]}>
          {label}
        </Text>
      ) : null}
      <TextInputRNP
        testID='text-input'
        style={styles.textInput}
        mode={mode == 'labelTop' ? 'outlined' : mode}
        theme={{roundness: borderRadius}}
        label={mode == 'labelTop' ? undefined : label}
        placeholder={placeholder}
        value={String(value)}
        onChangeText={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        error={error ? true : false}
        secureTextEntry={isSecureText}
        left={icon ? <TextInputRNP.Icon icon={icon} /> : undefined}
        right={
          secureText ? (
            <TextInputRNP.Icon
              testID='secure-text-icon'
              icon={iconName}
              onPress={() => {
                setIsSecureText(val => !val)
              }}
            />
          ) : null
        }
        disabled={disabled}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

function getLineColor(
  isFocus: boolean,
  error: string | undefined,
  disabled: boolean | undefined,
  theme: AdaptiveMD3Theme,
  colorStyle?: ColorStyle,
) {
  if (error) {
    return colorStyle?.errorColor ?? theme.colors.error
  }
  if (disabled) {
    return colorStyle?.disabledColor ?? theme.colors.onSurfaceDisabled
  }
  if (isFocus) {
    return colorStyle?.focusColor ?? theme.colors.primary
  }
  return colorStyle?.defaultColor ?? theme.colors.onSurface
}
