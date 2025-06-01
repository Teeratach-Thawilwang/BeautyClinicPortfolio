import React, {useState} from 'react'
import {Controller} from 'react-hook-form'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import ConfirmModal from '@components/ConfirmModal'
import Dropdown from '@components/Dropdown'
import FlexBox from '@components/FlexBox'
import ModalDatePicker from '@components/ModalDatePicker'
import ModalTimeRangePicker from '@components/ModalTimeRangePicker'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {BookingStatus} from '@enums/StatusEnums'
import {useBookingForm} from '@hooks/backoffice/BookingHooks'
import {getFirstOrValue} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

export default function BookingForm({onSubmit, onDelete, booking}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const [visible, setVisible] = useState(false)
  const {control, handleSubmit, errors} = useBookingForm(booking)
  const errorsKeyList = Object.keys(errors) as (keyof typeof errors)[]
  const isDisableUpdate = errorsKeyList.length !== 0

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Booking Information</Text>
        <FlexBox
          mobileColumns={[1]}
          tabletColumns={[1, 1]}
          rowStyle={styles.flexBox}>
          <Controller
            control={control}
            name='id'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                label='ID'
                value={value ? String(value) : ''}
                onChange={value => {
                  onChange(Number(value))
                }}
                error={errors.id?.message}
                containerStyle={styles.inputItem}
                disabled
              />
            )}
          />
          <Controller
            control={control}
            name='user_id'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                label='User ID'
                value={value ? String(value) : ''}
                onChange={onChange}
                error={errors.user_id?.message}
                containerStyle={styles.inputItem}
                disabled
              />
            )}
          />
          <Controller
            control={control}
            name='course_id'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                label='Course ID'
                value={value ? String(value) : ''}
                onChange={value => {
                  onChange(Number(value))
                }}
                error={errors.course_id?.message}
                containerStyle={styles.inputItem}
                disabled
              />
            )}
          />
          <Controller
            control={control}
            name='status'
            render={({field: {onChange, value}}) => {
              const isError = !!errors.status?.message
              const dropdownContainerStyle = isError
                ? styles.dropdownErrorContainer
                : styles.dropdownContainer
              const dropdownLabelStyle = isError
                ? styles.dropdownErrorLabel
                : styles.dropdownLabel
              return (
                <View style={styles.inputItem}>
                  <Text style={dropdownLabelStyle}>Status</Text>
                  <Dropdown
                    data={[
                      {label: 'Incoming', value: 'incoming'},
                      {label: 'Cancelled', value: 'cancelled'},
                      {label: 'Completed', value: 'completed'},
                    ]}
                    placeholder='Select status'
                    onChange={value => {
                      onChange(getFirstOrValue(value))
                    }}
                    defaultValueByIndex={
                      value ? [getDefaultIndex(value)] : undefined
                    }
                    containerStyle={dropdownContainerStyle}
                  />
                  {errors.status?.message ? (
                    <Text style={styles.formErrorText}>
                      {errors.status?.message}
                    </Text>
                  ) : null}
                </View>
              )
            }}
          />
          <Controller
            control={control}
            name='booking_date'
            render={({field: {onChange, value}}) => (
              <View style={styles.inputItem}>
                <Text style={styles.bookingItemTitle}>Booking date</Text>
                <ModalDatePicker
                  onChange={onChange}
                  buttonText={value}
                  buttonContainerStyle={styles.bookingDateTimeButton}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name='booking_time'
            render={({field: {onChange, value}}) => (
              <View style={styles.inputItem}>
                <Text style={styles.bookingItemTitle}>Booking time</Text>
                <ModalTimeRangePicker
                  onChange={onChange}
                  initialTimeRange={value}
                  buttonText={`${value.start} - ${value.end}`}
                  buttonContainerStyle={styles.bookingDateTimeButton}
                />
              </View>
            )}
          />
        </FlexBox>
      </View>

      {isDisableUpdate ? (
        <Text style={styles.submitErrorText}>
          Please enter valid information.
        </Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.deleteButtonContainer}
          labelStyle={styles.deleteButtonLabel}
          onPress={() => setVisible(true)}>
          Delete
        </Button>
        <Button
          containerStyle={styles.submitButtonContainer}
          onPress={handleSubmit(onSubmit)}
          useLoading
          disabled={isDisableUpdate}>
          Update
        </Button>
      </View>

      <ConfirmModal
        isVisible={onDelete != undefined && visible}
        onConfirm={async () => {
          if (onDelete) await onDelete()
          setVisible(false)
        }}
        onDismiss={() => setVisible(false)}
      />
    </View>
  )
}

function getDefaultIndex(value: BookingStatus) {
  if (value === BookingStatus.Cancelled) {
    return 1
  }
  if (value === BookingStatus.Completed) {
    return 2
  }
  return 0
}
