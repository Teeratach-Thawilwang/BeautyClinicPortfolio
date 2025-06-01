import dayjs from 'dayjs'
import React, {useRef, useState} from 'react'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import SingleDateTimePicker from '@components/SingleDateTimePicker'
import {useTheme} from '@context-providers/ThemeProvider'
import {floorHalfHourDate} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props, TimeRange} from './types'

const ERROR_MESSAGES = {
  INVALID_RANGE: 'Please select an end time that is after the start time.',
}

export default function TimeRangePicker({
  onCancel,
  onConfirm,
  initialTimeRange,
  error,
  containerStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [errorInternal, setErrorInternal] = useState(error ?? '')

  const customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)
  const initialStartDate = initialTimeRange
    ? dayjs(initialTimeRange.start, 'HH:mm').toDate()
    : null
  const initialStopDate = initialTimeRange
    ? dayjs(initialTimeRange.end, 'HH:mm').toDate()
    : null
  const startDateRef = useRef<Date | null>(initialStartDate)
  const stopDateRef = useRef<Date | null>(initialStopDate)

  function onConfirmHandler() {
    const currentDate = floorHalfHourDate(new Date())
    if (startDateRef.current == null) {
      startDateRef.current = currentDate
    }
    if (stopDateRef.current == null) {
      stopDateRef.current = currentDate
    }

    if (stopDateRef.current <= startDateRef.current) {
      setErrorInternal(ERROR_MESSAGES.INVALID_RANGE)
      return
    }

    const timeRange: TimeRange = {
      start: dayjs(startDateRef.current).format('HH:mm'),
      end: dayjs(stopDateRef.current).format('HH:mm'),
    }

    onConfirm(timeRange)
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>Select time range</Text>
      <View style={styles.timeLabelContainer}>
        <View style={styles.timeLabelItem}>
          <Text style={styles.timeLabelText}>Hour</Text>
          <Text style={styles.timeLabelText}>Minute</Text>
        </View>
        <View style={styles.timeLabelSpace} />
        <View style={styles.timeLabelItem}>
          <Text style={styles.timeLabelText}>Hour</Text>
          <Text style={styles.timeLabelText}>Minute</Text>
        </View>
      </View>
      <View style={styles.flexRow}>
        <SingleDateTimePicker
          initialDate={startDateRef.current ?? undefined}
          onChange={date => {
            startDateRef.current = date
            if (errorInternal.length != 0) {
              setErrorInternal('')
            }
          }}
          backgroundColor={theme.colors.surfaceContainerHigh}
          dividerColor={theme.colors.surfaceVariant}
          width={150}
          minuteInterval={30}
        />
        <Text style={styles.textSaparate}>-</Text>
        <SingleDateTimePicker
          initialDate={stopDateRef.current ?? undefined}
          onChange={date => {
            stopDateRef.current = date
            if (errorInternal.length != 0) {
              setErrorInternal('')
            }
          }}
          backgroundColor={theme.colors.surfaceContainerHigh}
          dividerColor={theme.colors.surfaceVariant}
          width={150}
          minuteInterval={30}
        />
      </View>
      <View style={styles.buttonBoxContainer}>
        <Button
          mode='text'
          onPress={onCancel}
          containerStyle={styles.buttonContainer}
          labelStyle={styles.buttonCancelLabel}>
          Cancel
        </Button>
        <Button
          mode='text'
          onPress={onConfirmHandler}
          containerStyle={styles.buttonContainer}>
          Confirm
        </Button>
      </View>
      {errorInternal ? (
        <Text style={styles.errorText}>{errorInternal}</Text>
      ) : null}
    </View>
  )
}
