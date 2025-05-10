import React from 'react'
import {Image, Text, View} from 'react-native'
import Modal from 'react-native-modal'

import {useTheme} from '@context-providers/ThemeProvider'

import Button from '../Button'
import {getStyles} from './styles'
import {Props} from './types'

export default function ResponseModal({
  children,
  visible,
  title,
  text,
  imageSource,
  buttonText,
  onButtonPress = () => null,
  onDismiss = () => null,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <Modal
      testID='react-native-modal'
      isVisible={visible}
      onBackdropPress={onDismiss}
      animationIn='fadeIn'
      animationOut='fadeOut'
      animationInTiming={200}
      animationOutTiming={100}
      backdropColor={theme.colors.backdrop}>
      <View style={styles.modal}>
        <Image source={imageSource} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        {buttonText ? (
          <Button
            containerStyle={styles.buttonContainer}
            labelStyle={styles.buttonLabel}
            onPress={onButtonPress}>
            {buttonText}
          </Button>
        ) : null}
        {children}
      </View>
    </Modal>
  )
}
