import React, {useState} from 'react'
import {View} from 'react-native'
import {Modal, Portal} from 'react-native-paper'

import Button from '@components/Button'
import TimeRangePicker from '@components/TimeRangePicker'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function ModalTimeRangePicker({
  onChange,
  buttonText,
  initialTimeRange,
  containerStyle,
  modalContainerStyle,
  cardStyle,
  buttonContainerStyle,
  buttonLabelStyle,
  icon = 'clock-time-eight-outline',
  iconPosition = 'right',
  iconStyle,
  imageIcon,
  imageStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [visible, setVisible] = useState(false)

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <Button
          onPress={() => setVisible(true)}
          containerStyle={[buttonContainerStyle]}
          labelStyle={[buttonLabelStyle]}
          icon={icon}
          iconPosition={iconPosition}
          iconStyle={iconStyle}
          imageIcon={imageIcon}
          imageStyle={imageStyle}>
          {buttonText}
        </Button>
      </View>
      <Portal>
        <Modal
          testID='modal-time-range-picker'
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={modalContainerStyle}
          contentContainerStyle={[styles.card, cardStyle]}>
          <TimeRangePicker
            initialTimeRange={initialTimeRange}
            onCancel={() => setVisible(false)}
            onConfirm={time => {
              onChange(time)
              setVisible(false)
            }}
          />
        </Modal>
      </Portal>
    </>
  )
}
