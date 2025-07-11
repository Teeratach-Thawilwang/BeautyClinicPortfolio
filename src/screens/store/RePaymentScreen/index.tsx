import React, {useRef, useState} from 'react'
import {ScrollView, Text, View} from 'react-native'

import Button from '@components/Button'
import HeaderBar from '@components/HeaderBar'
import OrderSummary from '@components/OrderSummary'
import PaymentSelector from '@components/PaymentSelector'
import {useTheme} from '@context-providers/ThemeProvider'
import {PaymentMethod} from '@enums/PaymentEnums'
import {useNavigate} from '@hooks/CommonHooks'
import {useCreateChargeMutation} from '@hooks/store/OrderHooks'
import {RePaymentScreenRouteProp} from '@navigation/AppNavigator'
import OrderService from '@services/store/OrderService'

import {getStyles} from './styles'

export default function RePaymentScreen({
  route,
}: {
  route: RePaymentScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {orderId, coursePrice} = route.params
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined,
  )
  const [paymentFee, setPaymentFee] = useState<number | undefined>(undefined)
  const [grandTotal, setGrandTotal] = useState<number | undefined>(undefined)
  const [isShowValidateMessage, setIsShowValidateMessage] = useState(false)
  const scrollRef = useRef<ScrollView>(null)

  const {mutateAsync: createCharge} = useCreateChargeMutation()

  return (
    <View style={styles.container}>
      <HeaderBar title='Re-Payment' containerStyle={styles.headerBar} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}>
        <PaymentSelector
          onChange={method => {
            setPaymentMethod(method)
            setIsShowValidateMessage(false)
            if (method) {
              const fee = OrderService.calculatePaymentFee(coursePrice, method)
              setPaymentFee(fee)
              setGrandTotal(coursePrice + fee)
            } else {
              setPaymentFee(undefined)
              setGrandTotal(undefined)
            }
          }}
        />
        <OrderSummary
          subtotal={coursePrice}
          paymentFee={paymentFee}
          grandTotal={grandTotal}
        />
        {isShowValidateMessage ? (
          <Text style={styles.validateError}>กรุณาเลือกช่องทางการชำระเงิน</Text>
        ) : null}
      </ScrollView>
      <Button
        useLoading={true}
        onPress={async () => {
          if (paymentMethod == undefined) {
            setIsShowValidateMessage(true)
            scrollRef.current?.scrollToEnd({animated: true})
            return
          }
          setIsShowValidateMessage(false)
          if (grandTotal) {
            if (paymentMethod == PaymentMethod.CREDIT_CARD) {
              navigation.replace('PaymentScreen', {
                paymentMethod: paymentMethod,
                amount: grandTotal!,
                orderId: orderId,
              })
            } else {
              const charge = await createCharge({
                orderId: orderId,
                paymentMethod: paymentMethod,
              })
              navigation.replace('PaymentScreen', {
                paymentMethod: paymentMethod,
                amount: grandTotal,
                orderId: orderId,
                chargeId: charge?.id,
                qrCode: charge?.qr_code_image,
                authorizeUri: charge?.authorize_uri,
                referenceNo: charge?.reference_no,
              })
            }
          }
        }}
        containerStyle={styles.buttonContainer}
        labelStyle={styles.buttonLabel}>
        Checkout
      </Button>
    </View>
  )
}
