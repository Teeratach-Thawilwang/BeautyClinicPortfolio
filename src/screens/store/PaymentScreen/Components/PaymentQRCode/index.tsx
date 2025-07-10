import React from 'react'
import {Image, Text, View} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function PaymentQRCode({amount, qrCode, referenceNo}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: qrCode,
        }}
        style={styles.image}
      />
      <Text style={styles.amountText}>ยอดชำระเงิน ฿{amount.toFixed(2)}</Text>
      <Text style={styles.text}>Reference no {referenceNo}</Text>
      <Text style={styles.text}>กรุณาชำระภายใน 15 นาที</Text>
    </View>
  )
}
