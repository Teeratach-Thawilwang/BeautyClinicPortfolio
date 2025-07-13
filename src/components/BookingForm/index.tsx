import React, {useRef, useState} from 'react'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import {TimeRange} from '@components/TimeRangePicker/types'
import {useTheme} from '@context-providers/ThemeProvider'

import BookingDatePicker from './Components/BookingDatePicker'
import BookingTimePicker from './Components/BookingTimePicker'
import {getStyles} from './styles'
import {Props} from './types'

export default function BookingForm({
  initialDate,
  initialTime,
  availableSlots,
  timeSlotLoading,
  onDateChange,
  onSubmit,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  const [step, setStep] = useState<1 | 2>(1)
  const [error, setError] = useState<string | undefined>(undefined)
  const dateRef = useRef<string | undefined>(initialDate)
  const timeRef = useRef<TimeRange | undefined>(initialTime)
  const buttonText = step == 1 ? 'Next' : 'Confirm'

  return (
    <View style={styles.container}>
      {step == 1 ? (
        <BookingDatePicker
          initialDate={dateRef.current}
          onChange={date => {
            dateRef.current = date
          }}
        />
      ) : null}
      {step == 2 ? (
        <BookingTimePicker
          initialTime={timeRef.current}
          availableSlots={availableSlots}
          timeSlotLoading={timeSlotLoading}
          onChange={time => {
            timeRef.current = time
          }}
        />
      ) : null}
      <View style={styles.buttonBox}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {step == 2 ? (
          <Button
            onPress={() => {
              setStep(1)
            }}
            containerStyle={styles.backButtonContainer}
            labelStyle={styles.backLabel}>
            Back
          </Button>
        ) : null}
        <Button
          useLoading={true}
          onPress={async () => {
            if (step == 1) {
              if (dateRef.current) {
                onDateChange(dateRef.current)
                setError(undefined)
                setStep(2)
              } else {
                setError('จำเป็นต้องเลือกวันที่')
              }
            }

            if (step == 2) {
              if (dateRef.current && timeRef.current) {
                setError(undefined)
                await onSubmit({
                  date: dateRef.current,
                  time: timeRef.current,
                })
              } else {
                setError('จำเป็นต้องเลือกเวลา')
              }
            }
          }}
          containerStyle={styles.buttonContainer}>
          {buttonText}
        </Button>
      </View>
    </View>
  )
}
