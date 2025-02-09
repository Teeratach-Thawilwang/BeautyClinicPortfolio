import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import Modal from 'react-native-modal'
import {MD3Theme, Text} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'

type ImageTextModalProps = {
  visible: boolean
  onDismiss: () => void
  title: string
  text: string
  imageSource: any
  children?: JSX.Element
}

export default function ImageTextModal(props: ImageTextModalProps) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {visible, onDismiss, title, text, imageSource, children} = props

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onDismiss}
      animationIn='bounceIn'
      animationOut='bounceOut'
      animationInTiming={500}
      animationOutTiming={500}
      backdropColor={theme.colors.backdrop}>
      <View style={styles.modal}>
        <Image source={imageSource} style={styles.icon} />
        <Text variant='titleLarge' style={styles.title}>
          {title}
        </Text>
        <Text variant='titleSmall' style={styles.text}>
          {text}
        </Text>
        {children}
      </View>
    </Modal>
  )
}

function getStyles(theme: MD3Theme) {
  return StyleSheet.create({
    modal: {
      margin: 25,
      padding: 20,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.outlineVariant,
      borderWidth: 1,
      borderRadius: 20,
    },
    icon: {
      width: 80,
      height: 80,
      alignSelf: 'center',
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      marginVertical: 10,
      color: theme.colors.onSurface,
    },
    text: {
      textAlign: 'center',
      fontWeight: 'light',
      marginBottom: 10,
      paddingHorizontal: 10,
      color: theme.colors.onSurfaceVariant,
    },
  })
}
