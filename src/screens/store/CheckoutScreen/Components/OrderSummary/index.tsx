import React from 'react'
import {Text, View} from 'react-native'

import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function OrderSummary({
  subtotal,
  paymentFee,
  grandTotal,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order summary</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal.toFixed(2)}฿</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Payment Fee</Text>
        <Text style={styles.text}>
          {paymentFee ? paymentFee.toFixed(2) : ' '}฿
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Grand Total</Text>
        <Text style={styles.text}>
          {grandTotal ? grandTotal.toFixed(2) : ' '}฿
        </Text>
      </View>
    </View>
  )
}
