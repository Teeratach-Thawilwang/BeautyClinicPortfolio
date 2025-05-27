import React from 'react'

import ResponseModal from '@components/ResponseModal'
import AuthenticationService from '@services/AuthenticationService'

type ResponseProps = {
  isVisible: boolean
  onDismiss: () => void
}

export default function ForgotPasswordResponse({
  isVisible,
  onDismiss,
}: ResponseProps) {
  const error = AuthenticationService.getError()

  if (error) {
    return (
      <ResponseModal
        isVisible={isVisible}
        isSuccess={false}
        title='Reset Password Failed.'
        text={error}
        onDismiss={onDismiss}
      />
    )
  }

  return (
    <ResponseModal
      isVisible={isVisible}
      isSuccess={true}
      title='Reset Password.'
      text='You will shortly receive an email with a link to reset your password.'
      onDismiss={onDismiss}
    />
  )
}
