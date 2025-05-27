import React from 'react'
import {StyleSheet} from 'react-native'
import {Button, MD3Theme} from 'react-native-paper'

import ImageTextModal from '@components/ImageTextModal'
import {useTheme} from '@context-providers/ThemeProvider'

type ResponseModalProps = {
  isVisible: boolean
  isSuccess: boolean
  title: string
  text: string
  buttonText?: string
  children?: JSX.Element
  onButtonPress?: () => void
  onDismiss?: () => void
}

export default function ResponseModal({
  isVisible,
  isSuccess,
  title,
  text,
  buttonText,
  children,
  onButtonPress = () => null,
  onDismiss = () => null,
}: ResponseModalProps) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <ImageTextModal
      visible={isVisible}
      onDismiss={onDismiss}
      title={title}
      text={text}
      imageSource={
        isSuccess
          ? require('@assets/successfully_icon.png')
          : require('@assets/failed_icon.png')
      }>
      <>
        {buttonText ? (
          <Button
            style={styles.button}
            labelStyle={styles.buttonLabel}
            mode='contained'
            onPress={onButtonPress}>
            {buttonText}
          </Button>
        ) : null}
        {children}
      </>
    </ImageTextModal>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    button: {
      borderRadius: 25,
      marginTop: 10,
      paddingVertical: 4,
      color: theme.colors.onPrimary,
      backgroundColor: theme.colors.primary,
    },
    buttonLabel: {
      fontSize: theme.fonts.bodyLarge.fontSize,
    },
  })
}
