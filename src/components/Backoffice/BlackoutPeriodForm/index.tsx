import dayjs from 'dayjs'
import React, {useState} from 'react'
import {Controller} from 'react-hook-form'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import ConfirmModal from '@components/ConfirmModal'
import FlexBox from '@components/FlexBox'
import ModalDatePicker from '@components/ModalDatePicker'
import ModalTimeRangePicker from '@components/ModalTimeRangePicker'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {useBlackoutPeriodForm} from '@hooks/backoffice/BlackoutPeriodHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function BlackoutPeriodForm({
  onSubmit,
  onDelete,
  blackoutPeriod,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const [visible, setVisible] = useState(false)
  const {control, handleSubmit, errors} = useBlackoutPeriodForm(blackoutPeriod)
  const errorsKeyList = Object.keys(errors) as (keyof typeof errors)[]
  const isDisableUpdate = errorsKeyList.length !== 0

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Blackout Period Information</Text>
        <FlexBox
          mobileColumns={[1]}
          tabletColumns={[1, 1]}
          rowStyle={styles.flexBox}>
          <Controller
            control={control}
            name='date'
            render={({field: {onChange, value}}) => (
              <View style={styles.inputItem}>
                <Text style={styles.DateTimeItemTitle}>Date</Text>
                <ModalDatePicker
                  onChange={onChange}
                  buttonText={value ?? 'Select Date'}
                  buttonContainerStyle={styles.DateTimeItemButton}
                />
                {errors.date?.message ? (
                  <Text style={styles.formErrorText}>
                    {errors.date?.message}
                  </Text>
                ) : null}
              </View>
            )}
          />
          <Controller
            control={control}
            name='time_range'
            render={({field: {onChange, value}}) => (
              <View style={styles.inputItem}>
                <Text style={styles.DateTimeItemTitle}>Time</Text>
                <ModalTimeRangePicker
                  onChange={onChange}
                  initialTimeRange={value}
                  buttonText={
                    value?.start ? `${value.start} - ${value.end}` : 'Add Time'
                  }
                  buttonContainerStyle={styles.DateTimeItemButton}
                />
                {errors.time_range?.message ? (
                  <Text style={styles.formErrorText}>
                    {errors.time_range?.message}
                  </Text>
                ) : null}
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
        {blackoutPeriod && onDelete ? (
          <Button
            containerStyle={styles.deleteButtonContainer}
            labelStyle={styles.deleteButtonLabel}
            onPress={() => setVisible(true)}>
            Delete
          </Button>
        ) : (
          <Button
            containerStyle={styles.cancelButtonContainer}
            labelStyle={styles.cancelButtonLabel}
            onPress={() => navigation.goBack()}>
            Cancel
          </Button>
        )}
        <Button
          containerStyle={styles.submitButtonContainer}
          onPress={handleSubmit(onSubmit)}
          useLoading
          disabled={isDisableUpdate}>
          {blackoutPeriod ? 'Update' : 'Create'}
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
