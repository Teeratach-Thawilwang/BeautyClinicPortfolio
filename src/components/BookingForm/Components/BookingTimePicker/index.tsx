import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import Button from '@components/Button'
import {TimeRange} from '@components/TimeRangePicker/types'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function BookingTimePicker({
  initialTime,
  availableSlots,
  timeSlotLoading,
  onChange,
}: Props) {
  const {theme} = useTheme()
  const column = (availableSlots?.length ?? 0) > 6 ? 2 : 1
  const styles = getStyles(theme, column)
  const [time, setTime] = useState<TimeRange | undefined>(initialTime)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time</Text>
      {timeSlotLoading ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : null}
      <View style={styles.timePickerContainer}>
        {availableSlots?.map((slot, index) => {
          const isActive = time?.start == slot.start && time.end == slot.end
          return (
            <Button
              key={index}
              onPress={() => {
                if (onChange) onChange(slot)
                setTime(slot)
              }}
              containerStyle={[
                styles.buttonTimeSlotContainer,
                isActive ? {backgroundColor: theme.colors.primary} : {},
              ]}
              labelStyle={[
                styles.buttonTimeSlotLabel,
                isActive ? {color: theme.colors.onPrimary} : {},
              ]}>
              {`${slot.start} - ${slot.end}`}
            </Button>
          )
        })}
        {availableSlots && availableSlots.length % 2 != 0 ? (
          <Button
            disabled
            onPress={() => {}}
            containerStyle={{backgroundColor: 'transparent'}}
            labelStyle={{color: 'transparent'}}>
            00:00 - 00:00
          </Button>
        ) : null}
      </View>
    </View>
  )
}
