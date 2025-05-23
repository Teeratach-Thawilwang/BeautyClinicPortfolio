import React from 'react'
import Toast, {ToastConfig} from 'react-native-toast-message'

import SwipeToast from '@components/SwipeToast'

export default function ToastProvider() {
  return <Toast config={config} autoHide={false} swipeable={false} />
}

const config: ToastConfig = {
  success: props => <SwipeToast {...props} />,
  info: props => <SwipeToast {...props} />,
  warning: props => <SwipeToast {...props} />,
  error: props => <SwipeToast {...props} />,
}
