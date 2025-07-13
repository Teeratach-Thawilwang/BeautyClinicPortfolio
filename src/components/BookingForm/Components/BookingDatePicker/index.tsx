import dayjs from 'dayjs'
import React, {useRef} from 'react'
import {Text, View} from 'react-native'

import DateTimePicker from '@components/DateTimePicker'
import {useTheme} from '@context-providers/ThemeProvider'
import {useResponsiveScreen} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function BookingDatePicker({initialDate, onChange}: Props) {
  const {theme} = useTheme()
  const {width} = useResponsiveScreen()
  const responsiveWidth = Math.min(width, 400)
  const styles = getStyles(theme, responsiveWidth)
  const customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)
  const initialSingleDate = initialDate
    ? dayjs(initialDate, 'DD-MM-YYYY').toDate()
    : undefined
  const bookingDateRef = useRef<Date | undefined>(initialSingleDate)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Date</Text>
      <View style={styles.datePickerContainer}>
        <DateTimePicker
          mode='single'
          initialSingleDate={initialSingleDate}
          onChange={data => {
            const date = data.date as Date
            bookingDateRef.current = date
            const dateString = dayjs(date).format('DD-MM-YYYY')
            if (onChange) onChange(dateString)
          }}
          containerHeight={responsiveWidth - 40}
        />
      </View>
    </View>
  )
}
