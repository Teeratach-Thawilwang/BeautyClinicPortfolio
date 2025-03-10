import React from 'react'

import ResponseModal from '@components/ResponseModal'
import {useNavigate} from '@hooks/CommonHooks'
import AuthenticationService from '@services/AuthenticationService'

export default function ResetPasswordResponse({
  isVisible,
}: {
  isVisible: boolean
}) {
  const navigation = useNavigate()
  const error = AuthenticationService.getError()

  if (error) {
    return (
      <ResponseModal
        isVisible={isVisible}
        isSuccess={false}
        title='Update Failed.'
        text={error}
        buttonText='Continue'
        onButtonPress={() => navigation.replace('ForgotPasswordScreen')}
      />
    )
  }

  return (
    <ResponseModal
      isVisible={isVisible}
      isSuccess={true}
      title='Successfully.'
      text='Your password has been updated.'
      buttonText='Continue'
      onButtonPress={() =>
        navigation.replace('BottomTabScreens', {screen: 'Home'})
      }
    />
  )
}
