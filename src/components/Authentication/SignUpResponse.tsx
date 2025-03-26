import React from 'react'
import {Controller} from 'react-hook-form'
import {View} from 'react-native'
import {Text} from 'react-native-paper'

import Button from '@components/Button'
import ResponseModal from '@components/ResponseModal'
import AuthenticationService from '@services/AuthenticationService'
import {SignUpResponseStyle} from '@styles/AuthForm.style'

type ResponseProps = {
  isVisible: boolean
  onDismiss: () => void
  control: any
}

export default function SignUpResponse({
  isVisible,
  onDismiss,
  control,
}: ResponseProps) {
  const styles = SignUpResponseStyle()
  const error = AuthenticationService.getError()

  if (error) {
    return (
      <ResponseModal
        isVisible={isVisible}
        isSuccess={false}
        title='Sign In Failed.'
        text={error}
        onDismiss={onDismiss}
      />
    )
  }

  return (
    <ResponseModal
      isVisible={isVisible}
      isSuccess={true}
      title='Sign up successfully.'
      text='Please check your email inbox for a confirmation link to activate your account.'
      onDismiss={onDismiss}>
      <Controller
        control={control}
        name='email'
        render={({field: {value}}) => (
          <View style={styles.resendContainer}>
            <Text variant='titleSmall' style={styles.resendText}>
              Haven't received an email yet ?
            </Text>
            <Button
              mode='text'
              useLoading={true}
              containerStyle={styles.resendButton}
              labelStyle={styles.resendLabelButton}
              onPress={async () =>
                await AuthenticationService.resendConfirmSignup(value)
              }>
              Resend
            </Button>
          </View>
        )}
      />
    </ResponseModal>
  )
}
