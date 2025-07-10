import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {Text, TextInput as TextInputRNP} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useDebounce} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeTypes'

import {getStyles} from './styles'
import {ColorStyle, Props} from './types'

export default function TextInput({
  label = '',
  value = '',
  onChange,
  onSubmit,
  onChangeInject,
  mode,
  multiline,
  keyboardType,
  maxLength,
  placeholder,
  icon,
  right,
  error,
  secureText,
  clearText,
  disabled,
  useDebounceDelay,
  containerStyle = {},
  labelStyle,
  colorStyle,
  errorStyle,
}: Props) {
  const {height, borderRadius, backgroundColor, ...restContainerStyle} =
    containerStyle
  const inputHeight = Number(height ?? 40)
  const inputBorderRadius = Number(borderRadius ?? 5)
  const {theme} = useTheme()
  const styles = getStyles(theme, inputHeight)
  const [isSecureText, setIsSecureText] = useState(secureText ?? false)
  const [isFocus, setIsFocus] = useState(false)
  const iconName = isSecureText ? 'eye-outline' : 'eye-off-outline'
  const labelColor = getLineColor(isFocus, error, disabled, theme, colorStyle)
  const [debounceValue, setDebounceValue] = useDebounce(
    value,
    val => {
      if (onChange) onChange(val as string)
    },
    useDebounceDelay,
  )

  useEffect(() => {
    setDebounceValue(value)
  }, [value])

  return (
    <View style={[styles.container, restContainerStyle]}>
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
        style={[
          styles.textInput,
          backgroundColor ? {backgroundColor: backgroundColor} : {},
        ]}
        outlineColor={theme.colors.outlineVariant}
        mode={mode == 'labelTop' ? 'outlined' : mode}
        multiline={multiline}
        keyboardType={keyboardType}
        maxLength={maxLength}
        theme={{roundness: inputBorderRadius}}
        label={mode == 'labelTop' ? undefined : label}
        placeholder={placeholder}
        value={String(debounceValue)}
        onChangeText={value => {
          let text = value
          if (onChangeInject) {
            text = onChangeInject(value)
          }
          setDebounceValue(text)
        }}
        onSubmitEditing={() => {
          if (onSubmit) onSubmit(String(debounceValue))
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        error={error ? true : false}
        secureTextEntry={isSecureText}
        left={icon ? <TextInputRNP.Icon icon={icon} /> : undefined}
        right={
          right ??
          (secureText ? (
            <TextInputRNP.Icon
              testID='secure-text-icon'
              icon={iconName}
              onPress={() => {
                setIsSecureText(val => !val)
              }}
            />
          ) : clearText && String(debounceValue).length > 0 ? (
            <TextInputRNP.Icon
              testID='clear-text-icon'
              icon='close'
              onPress={() => {
                setDebounceValue('')
                if (onChange) onChange('')
                if (onSubmit) onSubmit('')
              }}
            />
          ) : null)
        }
        disabled={disabled}
      />
      {error ? (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      ) : null}
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
