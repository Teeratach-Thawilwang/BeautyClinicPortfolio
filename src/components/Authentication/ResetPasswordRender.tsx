import {User} from '@supabase/supabase-js'
import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import ResetPasswordError from '@components/Authentication/ResetPasswordError'
import ResetPasswordForm from '@components/Authentication/ResetPasswordForm'
import {useTheme} from '@context-providers/ThemeProvider'

type ResetPasswordRenderProps = {
  isFirstRender: boolean
  user: User | null
  error: string | null
  onSuccess: () => void
}

export default function ResetPasswordRender({
  isFirstRender,
  user,
  error,
  onSuccess,
}: ResetPasswordRenderProps) {
  const {theme} = useTheme()
  const styles = getStyles()

  if (isFirstRender) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator animating={true} color={theme.colors.primary} size='small' />
      </View>
    )
  }
  if (!isFirstRender && user) {
    return <ResetPasswordForm email={user.email!} onSuccess={onSuccess} />
  }
  if (!isFirstRender && error) {
    return <ResetPasswordError error={error} />
  }

  return null
}

function getStyles() {
  const {width, height} = Dimensions.get('window')
  return StyleSheet.create({
    containerLoading: {
      width: width - 40,
      height: height,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  })
}
