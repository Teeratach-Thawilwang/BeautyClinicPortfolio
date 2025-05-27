import React from 'react'
import {Text, View} from 'react-native'
import {Modal, Portal} from 'react-native-paper'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function ConfirmModal({
  isVisible,
  onConfirm,
  onDismiss,
  title = 'Confirm Delete',
  text = 'Are you sure you want to delete this item?',
  containerStyle,
  cardStyle,
  titleStyle,
  textStyle,
  buttonContainerStyle,
  cancelButtonContainerStyle,
  cancelButtonLabelStyle,
  confirmButtonContainerStyle,
  confirmButtonLabelStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  return (
    <Portal>
      <Modal
        testID='confirm-modal'
        visible={isVisible}
        onDismiss={onDismiss}
        style={[styles.container, containerStyle]}>
        <View style={[styles.card, cardStyle]}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          <Text style={[styles.text, textStyle]}>{text}</Text>
          <View style={[styles.buttonContainer, buttonContainerStyle]}>
            <Button
              containerStyle={[
                styles.cancelButtonContainer,
                cancelButtonContainerStyle,
              ]}
              labelStyle={[styles.cancelButtonLabel, cancelButtonLabelStyle]}
              onPress={onDismiss}>
              Cancel
            </Button>
            <Button
              containerStyle={[
                styles.confirmButtonContainer,
                confirmButtonContainerStyle,
              ]}
              labelStyle={[confirmButtonLabelStyle]}
              useLoading={true}
              onPress={onConfirm}>
              Confirm
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}
