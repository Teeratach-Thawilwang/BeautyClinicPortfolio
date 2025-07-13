import dayjs from 'dayjs'
import React, {useRef, useState} from 'react'
import {View} from 'react-native'
import {Modal, Portal} from 'react-native-paper'

import Button from '@components/Button'
import DateTimePicker from '@components/DateTimePicker'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function ModalDatePicker({
  onChange,
  buttonText,
  containerStyle,
  modalContainerStyle,
  cardStyle,
  buttonContainerStyle,
  buttonLabelStyle,
  icon = 'calendar-month-outline',
  iconPosition = 'right',
  iconStyle,
  imageIcon,
  imageStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [visible, setVisible] = useState(false)

  const dateRegex = /^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/
  const customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)
  const initialSingleDate = dateRegex.test(buttonText)
    ? dayjs(buttonText, 'DD-MM-YYYY').toDate()
    : new Date()
  const bookingDateRef = useRef<Date | undefined>(initialSingleDate)

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
          testID='modal-date-picker'
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={modalContainerStyle}
          contentContainerStyle={[styles.card, cardStyle]}>
          <DateTimePicker
            mode='single'
            initialSingleDate={initialSingleDate}
            onChange={data => {
              bookingDateRef.current = data.date as Date
            }}
            containerHeight={300}
          />
          <Button
            mode='text'
            onPress={() => {
              if (bookingDateRef.current) {
                const date = dayjs(bookingDateRef.current).format('DD-MM-YYYY')
                onChange(date)
              }
              setVisible(false)
            }}>
            Confirm
          </Button>
        </Modal>
      </Portal>
    </>
  )
}
