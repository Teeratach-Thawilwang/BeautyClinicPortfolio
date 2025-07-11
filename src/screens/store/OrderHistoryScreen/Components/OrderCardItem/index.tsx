import React from 'react'
import {Image, Text, View} from 'react-native'
import {Divider} from 'react-native-paper'

import Button from '@components/Button'
import {useTheme} from '@context-providers/ThemeProvider'
import {OrderStatusEnum} from '@enums/StatusEnums'
import {useNavigate} from '@hooks/CommonHooks'

import {getStyles} from './styles'
import {Props} from './types'

const orderPaymentStatusMapping = {
  created: 'ยังไม่ชำระ',
  ongoing: 'ชำระเเล้ว',
  completed: 'รักษาเสร็จสิ้น',
  cancel: 'ยกเลิกคำสั่งซื้อ',
}

export default function OrderCardItem({order}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  const isPaid =
    order.status == OrderStatusEnum.Ongoing ||
    order.status == OrderStatusEnum.Completed
  const orderPrice = isPaid
    ? (order.amount / 100).toFixed(2)
    : order.courses.price.toFixed(2)
  const durationHour = order.courses.duration_per_round
  const {duration, unit} =
    durationHour >= 1
      ? {duration: durationHour, unit: 'ชั่วโมง'}
      : {duration: durationHour * 60, unit: 'นาที'}

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.flexBetween]}>
        <View style={styles.row}>
          <Text style={styles.body}>เลขคำสั่งซื้อ </Text>
          <Text style={styles.labelBold}>{order.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.body}>ราคา </Text>
          <Text style={styles.labelBold}>฿{orderPrice}</Text>
        </View>
      </View>
      <View style={[styles.row, styles.marginTop]}>
        <Text style={styles.fieldNote}>วันที่สั่งซื้อ </Text>
        <Text style={styles.valueNote}>{order.created_at}</Text>
      </View>
      <Divider bold style={styles.devider} />
      <View style={styles.row}>
        <Image
          source={{
            uri:
              order.courses.images.length > 0
                ? order.courses.images[0].uri
                : '',
          }}
          style={styles.image}
        />
        <View style={styles.courseContainer}>
          <Text style={styles.labelBold}>{order.courses.name}</Text>
          <View style={styles.row}>
            <Text style={styles.body}>จำนวนนัดหมาย </Text>
            <Text style={styles.labelBold}>
              {order.courses.treatment_rounds}
            </Text>
            <Text style={styles.body}> ครั้ง</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.body}>ระยะเวลาต่อรอบ </Text>
            <Text style={styles.labelBold}>{duration}</Text>
            <Text style={styles.body}> {unit}</Text>
          </View>
        </View>
      </View>
      <Divider bold style={styles.devider} />
      <View style={styles.status}>
        <Text style={styles.body}>สถานะคำสั่งซื้อ </Text>
        <Text style={styles.labelBold}>
          {orderPaymentStatusMapping[order.status]}
        </Text>
      </View>
      {!isPaid ? (
        <Button
          onPress={() => {
            navigation.navigate('RePaymentScreen', {
              orderId: order.id,
              coursePrice: order.courses.price,
            })
          }}
          containerStyle={styles.buttonContainer}>
          ดำเนินการชำระ
        </Button>
      ) : null}
    </View>
  )
}
