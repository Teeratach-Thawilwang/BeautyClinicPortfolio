import dayjs from 'dayjs'
import React, {useCallback, useRef, useState} from 'react'
import {Text, View} from 'react-native'
import Modal from 'react-native-modal'
import {IconButton} from 'react-native-paper'

import Button from '@components/Button'
import SingleDateTimePicker from '@components/SingleDateTimePicker'
import TimeRangePicker from '@components/TimeRangePickerCustom'
import {useTheme} from '@context-providers/ThemeProvider'
import {floorHalfHourDate} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props, TimeRange} from './types'

const ERROR_MESSAGES = {
  INVALID_RANGE: 'Please select an end time that is after the start time.',
  OVERLAP: 'The selected time range overlaps with an existing one.',
}

export default function index({
  onChange,
  initialValue = [],
  maxLength = 5,
  title,
  containerStyle,
  titleStyle,
  timeContainerStyle,
  timeBoxStyle,
  timeLabelStyle,
  removeIconStyle,
  buttonStyle,
  buttonLabelStyle,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [times, setTimes] = useState<TimeRange[]>(initialValue)
  const [visible, setIsvisible] = useState(false)
  const [error, setError] = useState('')
  const startDateRef = useRef<Date | null>(null)
  const stopDateRef = useRef<Date | null>(null)

  const onDismiss = useCallback(() => {
    setIsvisible(false)
    setError('')
    startDateRef.current = null
    stopDateRef.current = null
  }, [])

  function removeTimeHandler(index: number) {
    const newTimes = times.filter((_, i) => i !== index)
    setTimes(newTimes)
    onChange(newTimes)
  }

  function addTimeRangeHandler() {
    const currentDate = floorHalfHourDate(new Date())
    if (startDateRef.current == null) {
      startDateRef.current = currentDate
    }
    if (stopDateRef.current == null) {
      stopDateRef.current = currentDate
    }

    if (stopDateRef.current <= startDateRef.current) {
      setError(ERROR_MESSAGES.INVALID_RANGE)
      return
    }

    const timeRange: TimeRange = {
      start: dayjs(startDateRef.current).format('HH:mm'),
      end: dayjs(stopDateRef.current).format('HH:mm'),
    }

    if (isTimeOverlaping(times, timeRange)) {
      setError(ERROR_MESSAGES.OVERLAP)
      return
    }

    const newTimes = sortTimeRanges([...times, timeRange])
    onChange(newTimes)
    setTimes(newTimes)
    setIsvisible(false)
    setError('')
    startDateRef.current = null
    stopDateRef.current = null
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
      <View style={[styles.timeContainer, timeContainerStyle]}>
        {times.map((time, index) => (
          <View key={index} style={[styles.timeBox, timeBoxStyle]}>
            <Text style={[styles.timeLabel, timeLabelStyle]}>
              {time.start} - {time.end}
            </Text>
            <IconButton
              icon='ion-trash-outline'
              iconColor={removeIconStyle?.color ?? styles.removeIcon.color}
              style={styles.removeIcon}
              size={removeIconStyle?.width ?? styles.removeIcon.width}
              onPress={() => removeTimeHandler(index)}
            />
          </View>
        ))}
        {times.length < maxLength ? (
          <Button
            containerStyle={[styles.button, buttonStyle]}
            labelStyle={[buttonLabelStyle]}
            icon='mat-add-box'
            onPress={() => setIsvisible(true)}>
            Add time
          </Button>
        ) : null}
      </View>
      <Modal
        testID='times-picker-modal'
        isVisible={visible}
        onBackdropPress={onDismiss}
        animationIn='fadeIn'
        animationOut='fadeOut'
        animationInTiming={1}
        animationOutTiming={1}
        backdropColor={theme.colors.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Select time range</Text>
          <View style={styles.timeLabelContainer}>
            <View style={styles.timeLabelItem}>
              <Text style={styles.timeLabelText}>Hour</Text>
              <Text style={styles.timeLabelText}>Minute</Text>
            </View>
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
                if (error.length != 0) {
                  setError('')
                }
              }}
              backgroundColor={theme.colors.surfaceContainer}
              dividerColor={theme.colors.surfaceVariant}
              width={150}
              minuteInterval={30}
            />
            <Text style={styles.textSaparate}>-</Text>
            <SingleDateTimePicker
              initialDate={stopDateRef.current ?? undefined}
              onChange={date => {
                stopDateRef.current = date
                if (error.length != 0) {
                  setError('')
                }
              }}
              backgroundColor={theme.colors.surfaceContainer}
              dividerColor={theme.colors.surfaceVariant}
              width={150}
              minuteInterval={30}
            />
          </View>
          <View style={styles.modalButtonFlex}>
            <Button
              mode='text'
              onPress={onDismiss}
              containerStyle={styles.modalButtonContainer}
              labelStyle={styles.modalButtonCancelLabel}>
              Cancel
            </Button>
            <Button
              mode='text'
              onPress={addTimeRangeHandler}
              containerStyle={styles.modalButtonContainer}>
              Confirm
            </Button>
          </View>
          {error ? <Text style={styles.modalErrorText}>{error}</Text> : null}
        </View>
      </Modal>
    </View>
  )
}

function isOverlapping(a: TimeRange, b: TimeRange): boolean {
  const aStart = dayjs(`2000-01-01T${a.start}`)
  const aEnd = dayjs(`2000-01-01T${a.end}`)
  const bStart = dayjs(`2000-01-01T${b.start}`)
  const bEnd = dayjs(`2000-01-01T${b.end}`)

  return aStart.isBefore(bEnd) && aEnd.isAfter(bStart)
}

function isTimeOverlaping(
  existingRanges: TimeRange[],
  newRange: TimeRange,
): boolean {
  return existingRanges.some(range => isOverlapping(range, newRange))
}

function sortTimeRanges(ranges: TimeRange[]): TimeRange[] {
  return [...ranges].sort((a, b) => {
    const aStart = dayjs(`2000-01-01T${a.start}`)
    const bStart = dayjs(`2000-01-01T${b.start}`)
    return aStart.diff(bStart)
  })
}
