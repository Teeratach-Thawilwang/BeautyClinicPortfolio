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

export default function ResponseModal(props: ResponseModalProps) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  let {isVisible, isSuccess, title, text, buttonText, children, onButtonPress, onDismiss} = props

  return (
    <ImageTextModal
      visible={isVisible}
      onDismiss={onDismiss ?? (() => null)}
      title={title}
      text={text}
      imageSource={isSuccess ? require('@assets/successfully_icon.png') : require('@assets/failed_icon.png')}>
      <>
        {buttonText ? (
          <Button
            style={styles.button}
            labelStyle={{fontSize: theme.fonts.bodyLarge.fontSize}}
            mode='contained'
            onPress={onButtonPress}>
            {buttonText}
          </Button>
        ) : (
          <></>
        )}
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
  })
}
