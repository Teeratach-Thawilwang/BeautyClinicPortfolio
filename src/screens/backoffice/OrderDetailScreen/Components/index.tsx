import React from 'react'
import {Controller} from 'react-hook-form'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import Dropdown from '@components/Dropdown'
import FlexBox from '@components/FlexBox'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {OrderStatusEnum} from '@enums/StatusEnums'
import {useOrderForm} from '@hooks/backoffice/OrderHooks'
import {getFirstOrValue} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

export default function OrderForm({order, onSubmit}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const {control, handleSubmit, errors} = useOrderForm(order)
  const errorsKeyList = Object.keys(errors) as (keyof typeof errors)[]
  const isDisableUpdate = errorsKeyList.length !== 0

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Order Information</Text>
        <FlexBox
          mobileColumns={[1]}
          tabletColumns={[1, 1]}
          rowStyle={styles.flexBox}>
          <TextInput
            mode='labelTop'
            label='ID'
            value={order.id}
            onChange={_ => {}}
            containerStyle={styles.inputItem}
            disabled
          />
          <TextInput
            mode='labelTop'
            label='User ID'
            value={order.user_id}
            onChange={_ => {}}
            containerStyle={styles.inputItem}
            disabled
          />
          <TextInput
            mode='labelTop'
            label='Course ID'
            value={order.course_id}
            onChange={_ => {}}
            containerStyle={styles.inputItem}
            disabled
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
                      {label: 'Created', value: 'created'},
                      {label: 'Ongoing', value: 'ongoing'},
                      {label: 'Completed', value: 'completed'},
                      {label: 'Cancelled', value: 'cancelled'},
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
          <TextInput
            mode='labelTop'
            label='Net Price'
            value={order.amount}
            onChange={_ => {}}
            containerStyle={styles.inputItem}
            disabled
          />
          <TextInput
            mode='labelTop'
            label='Updated by'
            value={order.updated_by}
            onChange={_ => {}}
            containerStyle={styles.inputItem}
            disabled
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
          onPress={() => {}}>
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

function getDefaultIndex(value: OrderStatusEnum) {
  if (value === OrderStatusEnum.Ongoing) {
    return 1
  }
  if (value === OrderStatusEnum.Completed) {
    return 2
  }
  if (value === OrderStatusEnum.Cancel) {
    return 3
  }
  return 0
}
