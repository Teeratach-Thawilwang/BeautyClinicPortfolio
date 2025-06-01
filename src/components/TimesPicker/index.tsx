import dayjs from 'dayjs'
import React, {useCallback, useState} from 'react'
import {Text, View} from 'react-native'
import {IconButton, Modal, Portal} from 'react-native-paper'

import Button from '@components/Button'
import TimeRangePicker from '@components/TimeRangePicker'
import {TimeRange} from '@components/TimeRangePicker/types'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

const ERROR_MESSAGES = {
  OVERLAP: 'The selected time range overlaps with an existing one.',
}

export default function TimesPicker({
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
  const [refresh, setRefresh] = useState(false)

  const onDismiss = useCallback(() => {
    setIsvisible(false)
    setError('')
  }, [])

  function removeTimeHandler(index: number) {
    const newTimes = times.filter((_, i) => i !== index)
    setTimes(newTimes)
    onChange(newTimes)
  }

  function addTimeRangeHandler(timeRange: TimeRange) {
    if (isTimeOverlaping(times, timeRange)) {
      setError(ERROR_MESSAGES.OVERLAP)
      setRefresh(val => !val)
      return
    }

    const newTimes = sortTimeRanges([...times, timeRange])
    onChange(newTimes)
    setTimes(newTimes)
    setIsvisible(false)
    setError('')
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
      <Portal>
        <Modal
          testID='times-picker-modal'
          visible={visible}
          onDismiss={onDismiss}
          contentContainerStyle={styles.modalCard}>
          <TimeRangePicker
            key={`time-range-picker-${refresh}`}
            onCancel={onDismiss}
            onConfirm={addTimeRangeHandler}
            error={error}
            containerStyle={styles.timeRangeContainer}
          />
        </Modal>
      </Portal>
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
