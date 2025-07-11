import React, {useRef, useState} from 'react'
import {ScrollView, Text, View} from 'react-native'

import Button from '@components/Button'
import CourseCardItem from '@components/CourseCardItem'
import HeaderBar from '@components/HeaderBar'
import OrderSummary from '@components/OrderSummary'
import PaymentSelector from '@components/PaymentSelector'
import {useTheme} from '@context-providers/ThemeProvider'
import {PaymentMethod} from '@enums/PaymentEnums'
import {useNavigate} from '@hooks/CommonHooks'
import {
  useCreateChargeMutation,
  useCreateOrderMutation,
} from '@hooks/store/OrderHooks'
import {CheckoutScreenRouteProp} from '@navigation/AppNavigator'
import OrderService from '@services/store/OrderService'

import {getStyles} from './styles'

export default function CheckoutScreen({
  route,
}: {
  route: CheckoutScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {course, category} = route.params
  const courseItem = {...course, category: category}
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined,
  )
  const [paymentFee, setPaymentFee] = useState<number | undefined>(undefined)
  const [grandTotal, setGrandTotal] = useState<number | undefined>(undefined)
  const [isShowValidateMessage, setIsShowValidateMessage] = useState(false)
  const scrollRef = useRef<ScrollView>(null)

  const {mutateAsync: createOrder} = useCreateOrderMutation()
  const {mutateAsync: createCharge} = useCreateChargeMutation()

  return (
    <View style={styles.container}>
      <HeaderBar title='Checkout' containerStyle={styles.headerBar} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}>
        <CourseCardItem
          course={courseItem}
          isShowCategory={true}
          isPressable={false}
        />
        <PaymentSelector
          onChange={method => {
            setPaymentMethod(method)
            setIsShowValidateMessage(false)
            if (method) {
              const fee = OrderService.calculatePaymentFee(course.price, method)
              setPaymentFee(fee)
              setGrandTotal(course.price + fee)
            } else {
              setPaymentFee(undefined)
              setGrandTotal(undefined)
            }
          }}
        />
        <OrderSummary
          subtotal={course.price}
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
            const order = await createOrder({
              courseId: course.id,
              stangAmount: Math.ceil(grandTotal * 100),
            })

            if (paymentMethod == PaymentMethod.CREDIT_CARD) {
              navigation.replace('PaymentScreen', {
                paymentMethod: paymentMethod,
                amount: grandTotal!,
                orderId: order.id,
              })
            } else {
              const charge = await createCharge({
                orderId: order.id,
                stangAmount: Math.ceil(grandTotal * 100),
                paymentMethod: paymentMethod,
              })
              navigation.replace('PaymentScreen', {
                paymentMethod: paymentMethod,
                amount: grandTotal,
                orderId: order.id,
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
