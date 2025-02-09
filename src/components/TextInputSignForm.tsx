import React, {useState} from 'react'
import {Control, Controller, FieldError} from 'react-hook-form'
import {StyleSheet} from 'react-native'
import {MD3Theme, Text, TextInput} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

interface TextInputSignFormProps {
  label: string
  name: string
  icon: string
  control: Control<any>
  error: FieldError | undefined
  secureTextEntry?: boolean
  disabled?: boolean
}

export default function TextInputSignForm({
  label,
  name,
  icon,
  control,
  error,
  secureTextEntry,
  disabled,
}: TextInputSignFormProps) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [isSecureText, setIsSecureText] = useState(secureTextEntry ?? false)
  const iconName = isSecureText ? 'eye-outline' : 'eye-off-outline'

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.textInput}
            theme={{roundness: 8}}
            label={label}
            value={value}
            mode='outlined'
            left={<TextInput.Icon icon={icon} />}
            onChangeText={onChange}
            error={error ? true : false}
            secureTextEntry={isSecureText}
            right={
              secureTextEntry ? (
                <TextInput.Icon
                  icon={iconName}
                  onPress={() => {
                    setIsSecureText(val => !val)
                  }}
                />
              ) : null
            }
            disabled={disabled}
          />
        )}
      />
      {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
    </>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    textInput: {
      marginTop: 8,
      fontSize: theme.fonts.bodyMedium.fontSize,
      backgroundColor: theme.colors.inverseOnSurface,
    },
    errorText: {
      marginHorizontal: 16,
      color: theme.colors.error,
      fontSize: theme.fonts.bodySmall.fontSize,
    },
  })
}
