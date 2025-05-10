import React, {useMemo} from 'react'
import {Controller} from 'react-hook-form'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import Dropdown from '@components/Dropdown'
import FlexBox from '@components/FlexBox'
import ImagePicker from '@components/ImagePicker'
import TextInput from '@components/TextInput'
import TimesPicker from '@components/TimesPicker'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {useCourseForm} from '@hooks/backoffice/CourseHooks'
import {getFirstOrValue} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

export default function CourseForm({onSubmit, categories, course}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {control, handleSubmit, errors} = useCourseForm(course)
  const errorsKeyList = Object.keys(errors) as (keyof typeof errors)[]
  const isDisableUpdate = errorsKeyList.length !== 0

  const categoriesTransformed = useMemo(() => {
    return categories.map(category => ({
      label: category.name,
      value: String(category.id),
    }))
  }, [categories])

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Course Information</Text>
        <FlexBox
          mobileColumns={[1]}
          tabletColumns={[1, 1]}
          rowStyle={styles.flexBox}>
          {course ? (
            <Controller
              control={control}
              name='id'
              render={({field: {onChange, value}}) => (
                <TextInput
                  mode='labelTop'
                  label='Id'
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
          ) : null}
          <Controller
            control={control}
            name='name'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                label='Name'
                value={value ? String(value) : ''}
                onChange={onChange}
                error={errors.name?.message}
                containerStyle={styles.inputItem}
              />
            )}
          />
          <Controller
            control={control}
            name='description'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                multiline={true}
                label='Description'
                value={value ? String(value) : ''}
                onChange={onChange}
                error={errors.description?.message}
                containerStyle={styles.inputDescription}
              />
            )}
          />
        </FlexBox>
        <FlexBox
          mobileColumns={[1]}
          tabletColumns={[1, 1]}
          rowStyle={styles.flexBox}>
          <Controller
            control={control}
            name='price'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                keyboardType='number-pad'
                label='Price'
                value={value ? String(value) : ''}
                onChange={value => {
                  onChange(Number(value))
                }}
                error={errors.price?.message}
                containerStyle={styles.inputItem}
              />
            )}
          />
          <Controller
            control={control}
            name='treatment_rounds'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                keyboardType='number-pad'
                label='Treatment round'
                value={value ? String(value) : ''}
                onChange={value => {
                  onChange(Number(value))
                }}
                error={errors.treatment_rounds?.message}
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
                      {label: 'Inactive', value: 'inactive'},
                    ]}
                    placeholder='Select status'
                    onChange={value => {
                      onChange(getFirstOrValue(value))
                    }}
                    defaultValueByIndex={[value == 'active' ? 0 : 1]}
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
            name='category_id'
            render={({field: {onChange, value}}) => {
              const isError = !!errors.category_id?.message
              const dropdownContainerStyle = isError
                ? styles.dropdownErrorContainer
                : styles.dropdownContainer
              const dropdownLabelStyle = isError
                ? styles.dropdownErrorLabel
                : styles.dropdownLabel

              return (
                <View style={styles.inputItem}>
                  <Text style={dropdownLabelStyle}>Category</Text>
                  <Dropdown
                    data={categoriesTransformed}
                    placeholder='Select category'
                    onChange={value => {
                      onChange(Number(getFirstOrValue(value)))
                    }}
                    defaultValueByIndex={
                      value
                        ? [
                            categoriesTransformed.findIndex(
                              item => Number(item.value) == value,
                            ),
                          ]
                        : undefined
                    }
                    containerStyle={dropdownContainerStyle}
                  />
                  {errors.category_id?.message ? (
                    <Text style={styles.formErrorText}>
                      {errors.category_id?.message}
                    </Text>
                  ) : null}
                </View>
              )
            }}
          />
          <Controller
            control={control}
            name='images'
            render={({field: {onChange, value}}) => (
              <ImagePicker
                title='Images'
                initialUris={value}
                onChange={assets => {
                  onChange(assets)
                }}
                containerStyle={styles.imagePicker}
                titleStyle={styles.imagePickerTitle}
                imageStyle={styles.imagePickerBox}
                buttonStyle={styles.imagePickerBox}
              />
            )}
          />
        </FlexBox>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Course Settings</Text>
        <FlexBox
          mobileColumns={[1]}
          tabletColumns={[1, 1]}
          rowStyle={styles.flexBox}
          isPadding={true}>
          <Controller
            control={control}
            name='duration_per_round'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                keyboardType='number-pad'
                label='Treatment duration (Hour: 0.5, 1, 1.5, 2, ...)'
                value={value ? String(value) : ''}
                onChange={value => {
                  onChange(Number(value))
                }}
                error={errors.duration_per_round?.message}
                containerStyle={styles.inputItem}
              />
            )}
          />
          <Controller
            control={control}
            name='booking_limit_per_round'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                keyboardType='number-pad'
                label='Booking limit / round'
                value={value ? String(value) : ''}
                onChange={value => {
                  onChange(Number(value))
                }}
                error={errors.booking_limit_per_round?.message}
                containerStyle={styles.inputItem}
              />
            )}
          />
          <Controller
            control={control}
            name='appointment_editable_before'
            render={({field: {onChange, value}}) => (
              <TextInput
                mode='labelTop'
                keyboardType='number-pad'
                label='Appointment editable before  hours'
                value={value ? String(value) : ''}
                onChange={value => {
                  onChange(Number(value))
                }}
                error={errors.appointment_editable_before?.message}
                containerStyle={styles.inputItem}
              />
            )}
          />
        </FlexBox>
      </View>

      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Work times</Text>
        <Controller
          control={control}
          name='working_time_monday'
          render={({field: {onChange, value}}) => (
            <TimesPicker
              title='Monday'
              initialValue={value}
              onChange={onChange}
              containerStyle={styles.inputItem}
              titleStyle={styles.timeBoxTitle}
            />
          )}
        />
        <Controller
          control={control}
          name='working_time_tuesday'
          render={({field: {onChange, value}}) => (
            <TimesPicker
              title='Tuesday'
              initialValue={value}
              onChange={onChange}
              containerStyle={styles.inputItem}
              titleStyle={styles.timeBoxTitle}
            />
          )}
        />
        <Controller
          control={control}
          name='working_time_wednesday'
          render={({field: {onChange, value}}) => (
            <TimesPicker
              title='Wednesday'
              initialValue={value}
              onChange={onChange}
              containerStyle={styles.inputItem}
              titleStyle={styles.timeBoxTitle}
            />
          )}
        />
        <Controller
          control={control}
          name='working_time_thursday'
          render={({field: {onChange, value}}) => (
            <TimesPicker
              title='Thursday'
              initialValue={value}
              onChange={onChange}
              containerStyle={styles.inputItem}
              titleStyle={styles.timeBoxTitle}
            />
          )}
        />
        <Controller
          control={control}
          name='working_time_friday'
          render={({field: {onChange, value}}) => (
            <TimesPicker
              title='Friday'
              initialValue={value}
              onChange={onChange}
              containerStyle={styles.inputItem}
              titleStyle={styles.timeBoxTitle}
            />
          )}
        />
        <Controller
          control={control}
          name='working_time_saturday'
          render={({field: {onChange, value}}) => (
            <TimesPicker
              title='Saturday'
              initialValue={value}
              onChange={onChange}
              containerStyle={styles.inputItem}
              titleStyle={styles.timeBoxTitle}
            />
          )}
        />
        <Controller
          control={control}
          name='working_time_sunday'
          render={({field: {onChange, value}}) => (
            <TimesPicker
              title='Sunday'
              initialValue={value}
              onChange={onChange}
              containerStyle={styles.inputItem}
              titleStyle={styles.timeBoxTitle}
            />
          )}
        />
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
          {course ? 'Update' : 'Create'}
        </Button>
      </View>
    </View>
  )
}
