import React, {useEffect, useState} from 'react'
import {View, ViewProps} from 'react-native'

interface MockModalProps extends ViewProps {
  isVisible?: boolean
  children?: React.ReactNode
  onBackdropPress?: () => void
  testID?: string
}

export default function ReactNativeModal({
  isVisible = false,
  children,
  onBackdropPress,
  onBackButtonPress,
  onModalShow,
  onModalHide,
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
  style,
  ...restProps
}: MockModalProps & any) {
  const [visible, setVisible] = useState(isVisible)

  useEffect(() => {
    setVisible(isVisible)
    if (isVisible && onModalShow) {
      onModalShow()
    }
    if (!isVisible && onModalHide) {
      onModalHide()
    }
  }, [isVisible, onModalShow, onModalHide])

  return <View testID='react-native-modal-mock'>{visible ? children : null}</View>
}
