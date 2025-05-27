import React, {useState} from 'react'
import {Controller} from 'react-hook-form'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import ConfirmModal from '@components/ConfirmModal'
import Dropdown from '@components/Dropdown'
import FlexBox from '@components/FlexBox'
import ImagePicker from '@components/ImagePicker'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {useCategoryForm} from '@hooks/backoffice/CategoryHooks'
import {getFirstOrValue} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

export default function CategoryForm({onSubmit, onDelete, category}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const [visible, setVisible] = useState(false)
  const {control, handleSubmit, errors} = useCategoryForm(category)
  const errorsKeyList = Object.keys(errors) as (keyof typeof errors)[]
  const isDisableUpdate = errorsKeyList.length !== 0

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Category Information</Text>
        <FlexBox
          mobileColumns={[1]}
          tabletColumns={[1, 1]}
          rowStyle={styles.flexBox}>
          {category ? (
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
                    defaultValueByIndex={
                      value ? [value == 'active' ? 0 : 1] : undefined
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
      </View>

      {isDisableUpdate ? (
        <Text style={styles.submitErrorText}>
          Please enter valid information.
        </Text>
      ) : null}

      <View style={styles.buttonContainer}>
        {category && onDelete ? (
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
          {category ? 'Update' : 'Create'}
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
