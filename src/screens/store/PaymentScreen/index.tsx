import React, {useRef, useState} from 'react'
import {ScrollView, View} from 'react-native'
import {Text} from 'react-native-paper'

import Button from '@components/Button'
import ResponseModal from '@components/ResponseModal'
import {useTheme} from '@context-providers/ThemeProvider'
import {PaymentMethod} from '@enums/PaymentEnums'
import {ChargeStatusEnum} from '@enums/StatusEnums'
import {
  disableBackSwipe,
  useAppState,
  useFocusEffect,
  useNavigate,
} from '@hooks/CommonHooks'
import {
  useCreateChargeMutation,
  useCreateOmiseTokenMutation,
  useGetPaymentStatusMutation,
} from '@hooks/store/OrderHooks'
import {CardDetail, CreateChargeProps} from '@models/store/OrderTypes'
import {PaymentScreenRouteProp} from '@navigation/AppNavigator'

import PaymentCreditCard from './Components/PaymentCreditCard'
import PaymentMobileBanking from './Components/PaymentMobileBanking'
import PaymentQRCode from './Components/PaymentQRCode'
import {getStyles} from './styles'

export default function PaymentScreen({
  route,
}: {
  route: PaymentScreenRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const isAppActive = useAppState() == 'active'

  const {
    paymentMethod,
    amount,
    orderId,
    chargeId,
    qrCode,
    authorizeUri,
    referenceNo,
  } = route.params

  const [enable, setEnable] = useState(
    paymentMethod != PaymentMethod.CREDIT_CARD,
  )
  const [modal, setModal] = useState<'success' | 'error' | undefined>(undefined)
  const initialDelayMs = 2 * 1000
  const maxDelayMs = 10 * 1000
  const backoffFactor = 200
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const delayRef = useRef(initialDelayMs)

  const {mutateAsync: createToken, error: tokenError} =
    useCreateOmiseTokenMutation()
  const {
    mutateAsync: createCharge,
    data: charge,
    error: chargeError,
  } = useCreateChargeMutation()
  const {
    mutateAsync: getPaymentStatus,
    data: status,
    error: statusError,
  } = useGetPaymentStatusMutation()

  useFocusEffect(() => {
    if (status == ChargeStatusEnum.SUCCESSFUL) {
      setEnable(false)
      setModal('success')
    }
    if (tokenError || chargeError || statusError) {
      setModal('error')
    }
  }, [status, tokenError, chargeError, statusError])

  disableBackSwipe(() => true)

  useFocusEffect(() => {
    delayRef.current = initialDelayMs
    async function poll() {
      if (!enable) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        return
      }
      if (paymentMethod != PaymentMethod.CREDIT_CARD && chargeId)
        await getPaymentStatus(chargeId)
      if (paymentMethod == PaymentMethod.CREDIT_CARD && charge?.id)
        await getPaymentStatus(charge?.id)

      delayRef.current = Math.min(delayRef.current + backoffFactor, maxDelayMs)
      timeoutRef.current = setTimeout(poll, delayRef.current)
    }
    if (isAppActive) poll()
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isAppActive, enable, chargeId])

  function renderElement(paymentMethod: PaymentMethod) {
    switch (paymentMethod) {
      case PaymentMethod.QR_PROMPTPAY:
        return (
          <PaymentQRCode
            amount={amount}
            qrCode={qrCode ?? ''}
            referenceNo={referenceNo ?? ''}
          />
        )
      case PaymentMethod.CREDIT_CARD:
        return (
          <PaymentCreditCard
            amount={amount}
            disabled={status == ChargeStatusEnum.SUCCESSFUL}
            onSubmit={async card => {
              const [mm, yyyy] = card.expiration.split('/')
              const cardPayload: CardDetail = {
                name: card.name,
                number: card.number,
                expirationMonth: mm,
                expirationYear: yyyy,
                securityCode: card.securityCode,
              }
              const token = await createToken(cardPayload)
              const params: CreateChargeProps = {
                orderId: orderId,
                paymentMethod: paymentMethod,
                token: token,
              }
              await createCharge(params)
              setEnable(true)
            }}
          />
        )
      case PaymentMethod.K_PLUS:
      case PaymentMethod.SCB_EASY:
      case PaymentMethod.BUALUANG:
      case PaymentMethod.KRUNGTHAI_NEXT:
      case PaymentMethod.BUALUANG:
        return (
          <PaymentMobileBanking
            authorizeUri={authorizeUri!}
            amount={amount}
            referenceNo={referenceNo ?? ''}
          />
        )
      default:
        return <></>
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}>
      <Text style={styles.headerText}>ข้อมูลการชำระเงิน</Text>
      {renderElement(paymentMethod)}
      <View style={styles.buttonBox}>
        <Button
          mode='outlined'
          containerStyle={styles.buttonContainer}
          labelStyle={styles.buttonLabel}
          onPress={() => {
            navigation.navigate('BottomTabScreens', {screen: 'Home'})
          }}>
          กลับหน้าแรก
        </Button>
        {enable ? (
          <Button
            mode='outlined'
            containerStyle={styles.buttonContainer}
            labelStyle={styles.buttonLabel}
            onPress={() => {
              navigation.navigate('OrderHistoryScreen')
            }}>
            ไปหน้าการซื้อของฉัน
          </Button>
        ) : null}
      </View>
      <ResponseModal
        visible={modal != undefined}
        title={modal == 'success' ? 'Payment Successfully.' : 'Payment Failed.'}
        text={
          modal == 'success'
            ? 'ชำระเงินเสร็จสมบูรณ์\nขอบคุณที่ไว้ใจให้เราบริการ'
            : (tokenError?.message ??
              chargeError?.message ??
              statusError?.message ??
              '')
        }
        imageSource={
          modal == 'success'
            ? require('@assets/images/successfully_icon.png')
            : require('@assets/images/failed_icon.png')
        }
        buttonText={modal == 'success' ? 'ไปหน้าการซื้อของฉัน' : undefined}
        onDismiss={() => (modal == 'error' ? setModal(undefined) : null)}
        onButtonPress={() => {
          navigation.replace('OrderHistoryScreen')
          setModal(undefined)
        }}
      />
    </ScrollView>
  )
}
