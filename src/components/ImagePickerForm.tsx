import React from 'react'
import {Control, Controller, FieldError} from 'react-hook-form'
import {StyleSheet, Text} from 'react-native'

import ImageMultiPicker from '@components/ImagePicker'
import {useTheme} from '@context-providers/ThemeProvider'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'

export default function ImagePickerForm({
  name,
  control,
  error,
  initialUris,
  ...rest
}: {
  name: string
  control: Control<any>
  error: FieldError | undefined
  initialUris?: string[]
  maxPhoto?: number
  maxSize?: number
  title?: string
  saveToPhotos?: boolean
  containerStyle?: any
  titleStyle?: any
  noteStyle?: any
  removeIconStyle?: {width: number; color: string}
  imageContainerStyle?: any
  imageStyle?: any
  buttonStyle?: any
  buttonIconStyle?: {width: number; color: string}
  buttonTextStyle?: any
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value}}) => (
          <ImageMultiPicker onChange={onChange} initialUris={value} {...rest} />
        )}
      />
      {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
    </>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    errorText: {
      marginHorizontal: 16,
      color: theme.colors.error,
      fontSize: theme.fonts.bodySmall.fontSize,
    },
  })
}
