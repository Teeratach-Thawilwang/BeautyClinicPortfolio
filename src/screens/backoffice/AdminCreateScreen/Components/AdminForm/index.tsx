import React from 'react'
import {Controller} from 'react-hook-form'
import {Text, View} from 'react-native'

import Button from '@components/Button'
import TextInput from '@components/TextInput'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate} from '@hooks/CommonHooks'
import {useAdminForm} from '@hooks/backoffice/AdminHooks'

import {getStyles} from './styles'
import {Props} from './types'

export default function AdminForm({onSubmit}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {control, handleSubmit, errors} = useAdminForm()
  const errorsKeyList = Object.keys(errors) as (keyof typeof errors)[]
  const isDisableUpdate = errorsKeyList.length !== 0

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Controller
          control={control}
          name='email'
          render={({field: {onChange, value}}) => (
            <TextInput
              mode='labelTop'
              label='Email'
              value={value ? String(value) : ''}
              onChange={onChange}
              error={errors.email?.message}
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
          Add admin
        </Button>
      </View>
    </View>
  )
}
