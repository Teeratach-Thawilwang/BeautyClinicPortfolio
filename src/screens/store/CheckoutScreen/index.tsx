import React, {useRef, useState} from 'react'
import {ScrollView, Text, View} from 'react-native'

import Button from '@components/Button'
import CourseCardItem from '@components/CourseCardItem'
import HeaderBar from '@components/HeaderBar'
import {useTheme} from '@context-providers/ThemeProvider'
import {CheckoutScreenRouteProp} from '@navigation/AppNavigator'
import {PaymentMethod, calculatePaymentFee} from '@utils/Payments'

import OrderSummary from './Components/OrderSummary'
import PaymentSelector from './Components/PaymentSelector'
import {getStyles} from './styles'

export default function CheckoutScreen({
  route,
}: {
  route: CheckoutScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const course = route.params.course
  const category = route.params.category
  const courseItem = {...course, category: category}
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined,
  )
  const [paymentFee, setPaymentFee] = useState<number | undefined>(undefined)
  const [grandTotal, setGrandTotal] = useState<number | undefined>(undefined)
  const [isShowValidateMessage, setIsShowValidateMessage] = useState(false)
  const scrollRef = useRef<ScrollView>(null)

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
              const fee = calculatePaymentFee(course.price, method)
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
        onPress={() => {
          if (paymentMethod == undefined) {
            setIsShowValidateMessage(true)
            scrollRef.current?.scrollToEnd({animated: true})
            return
          }
          setIsShowValidateMessage(false)
        }}
        containerStyle={styles.buttonContainer}
        labelStyle={styles.buttonLabel}>
        Checkout
      </Button>
    </View>
  )
}
