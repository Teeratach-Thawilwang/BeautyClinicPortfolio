import React from 'react'
import {Controller} from 'react-hook-form'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import Dropdown from '@components/Dropdown'
import FlexBox from '@components/FlexBox'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {CustomerCourseStatus} from '@enums/StatusEnums'
import {useNavigate} from '@hooks/CommonHooks'
import {useCustomerCourseForm} from '@hooks/backoffice/CustomerCourseHooks'
import {getFirstOrValue} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

export default function CustomerCourseForm({course, onSubmit}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  const {control, handleSubmit, errors} = useCustomerCourseForm(course)
  const errorsKeyList = Object.keys(errors) as (keyof typeof errors)[]
  const isDisableUpdate = errorsKeyList.length !== 0

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Course Information</Text>
        <FlexBox
          mobileColumns={[1]}
          tabletColumns={[1, 1]}
          rowStyle={styles.flexBox}>
          <Controller
            control={control}
            name='quota_round'
            render={({field: {onChange, value}}) => (
              <TextInput
                keyboardType='number-pad'
                mode='labelTop'
                label='Treatment round'
                value={value}
                onChange={value => {
                  onChange(Number(value))
                }}
                error={errors.quota_round?.message}
                containerStyle={styles.inputItem}
              />
            )}
          />
          <Controller
            control={control}
            name='used_round'
            render={({field: {onChange, value}}) => (
              <TextInput
                keyboardType='number-pad'
                mode='labelTop'
                label='Used round'
                value={value}
                onChange={value => {
                  onChange(Number(value))
                }}
                error={errors.used_round?.message}
                containerStyle={styles.inputItem}
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
                      {label: 'Active', value: 'active'},
                      {label: 'Completed', value: 'completed'},
                      {label: 'Expired', value: 'expired'},
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
        </FlexBox>
      </View>

      {isDisableUpdate ? (
        <Text style={styles.submitErrorText}>
          Please enter valid information.
        </Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.cancelButtonContainer}
          labelStyle={styles.cancelButtonLabel}
          onPress={() => navigation.goBack()}>
          Cancel
        </Button>
        <Button
          containerStyle={styles.submitButtonContainer}
          onPress={handleSubmit(onSubmit)}
          useLoading
          disabled={isDisableUpdate}>
          Update
        </Button>
      </View>
    </View>
  )
}

function getDefaultIndex(value: CustomerCourseStatus) {
  if (value === CustomerCourseStatus.Completed) {
    return 1
  }
  if (value === CustomerCourseStatus.Expired) {
    return 2
  }
  return 0
}
