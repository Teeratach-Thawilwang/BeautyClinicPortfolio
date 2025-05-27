import React from 'react'

import ResponseModal from '@components/ResponseModal'
import AuthenticationService from '@services/AuthenticationService'

type ResponseProps = {
  isVisible: boolean
  onDismiss: () => void
}

export default function SignInResponse({isVisible, onDismiss}: ResponseProps) {
  const error = AuthenticationService.getError()

  if (!error) {
    return null
  }

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
