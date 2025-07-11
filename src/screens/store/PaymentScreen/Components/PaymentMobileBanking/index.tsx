import React from 'react'
import {Linking, Text, View} from 'react-native'
import {Icon} from 'react-native-paper'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'

import {getStyles} from './styles'
import {Props} from './types'

export default function PaymentMobileBanking({
  authorizeUri,
  amount,
  referenceNo,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Icon source='bank' size={100} color={theme.colors.primary} />
      <Text style={styles.title}>รอการชำระเงิน</Text>
      <Text style={styles.amountText}>ยอดชำระเงิน ฿{amount.toFixed(2)}</Text>
      <Text style={styles.text}>Reference no {referenceNo}</Text>
      <Text style={styles.text}>กรุณาชำระภายใน 15 นาที</Text>
      <Button
        useLoading={true}
        containerStyle={styles.buttonContainer}
        onPress={async () => {
          const canOpen = await Linking.canOpenURL(authorizeUri)
          if (canOpen) Linking.openURL(authorizeUri)
        }}>
        {`ดำเนินการชำระ ฿${amount.toFixed(2)}`}
      </Button>
    </View>
  )
}
