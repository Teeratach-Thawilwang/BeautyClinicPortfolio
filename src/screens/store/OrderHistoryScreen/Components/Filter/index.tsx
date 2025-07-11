import React, {useRef, useState} from 'react'
import {Text, View} from 'react-native'
import {IconButton} from 'react-native-paper'

import BottomSheet from '@components/BottomSheet'
import Button from '@components/Button'
import ButtonChoice from '@components/ButtonChoice'
import SearchFilterBar from '@components/SearchFilterBar'
import {useTheme} from '@context-providers/ThemeProvider'
import {OrderStatusEnum} from '@enums/StatusEnums'
import {createBottomSheetRef} from '@hooks/CommonHooks'
import {getFirstOrValue} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

const orderByChoices = [
  {label: 'น้อยไปมาก', value: 'ASC'},
  {label: 'มากไปน้อย', value: 'DESC'},
]

const statusChoices = [
  {label: 'ชำระเเล้ว', value: OrderStatusEnum.Ongoing},
  {label: 'ยังไม่ชำระ', value: OrderStatusEnum.Created},
  {label: 'รักษาเสร็จสิ้น', value: OrderStatusEnum.Completed},
]

export default function Filter({
  onChange,
  initialStatus,
  initialOrderBy = 'DESC',
  searchCount,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const buttonSheetRef = createBottomSheetRef()
  const statusRef = useRef<string | undefined>()
  const orderByRef = useRef<string | undefined>()
  const [resetFilter, setResetFilter] = useState(false)

  return (
    <>
      <SearchFilterBar
        searchCount={searchCount}
        onPress={() => {
          buttonSheetRef.current?.present()
        }}
      />
      <BottomSheet ref={buttonSheetRef}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.bottomSheetTitle}>Filter</Text>
          <IconButton
            style={styles.bottomSheetCloseIcon}
            icon='close'
            iconColor={theme.colors.onSurfaceVariant}
            onPress={() => {
              buttonSheetRef.current?.close()
            }}
          />
        </View>
        <View style={styles.filterItemContainer}>
          <Text style={styles.filterItemLabel}>สถานะคำสั่งซื้อ</Text>
          <ButtonChoice
            key={`bottomsheet-status-${resetFilter}`}
            data={statusChoices}
            initialValue={initialStatus ? [initialStatus] : undefined}
            onChange={values => {
              statusRef.current = getFirstOrValue<string>(values as string[])
            }}
            buttonContainerStyle={styles.buttomChoiceContainer}
            activeButtonContainerStyle={styles.activeButtomChoiceContainer}
          />
        </View>
        <View style={styles.filterItemContainer}>
          <Text style={styles.filterItemLabel}>เรียงลำดับจาก</Text>
          <ButtonChoice
            key={`bottomsheet-orderby-${resetFilter}`}
            data={orderByChoices}
            initialValue={[initialOrderBy]}
            onChange={values => {
              orderByRef.current = getFirstOrValue<string>(values as string[])
            }}
            buttonContainerStyle={styles.buttomChoiceContainer}
            activeButtonContainerStyle={styles.activeButtomChoiceContainer}
          />
        </View>
        <View style={styles.bottomSheetButtons}>
          <Button
            containerStyle={styles.resetButtonContainer}
            labelStyle={styles.resetButtonLabel}
            onPress={() => {
              onChange({
                status: undefined,
                orderBy: 'DESC',
              })
              statusRef.current = undefined
              orderByRef.current = undefined
              setResetFilter(val => !val)
            }}>
            Reset
          </Button>
          <Button
            containerStyle={styles.confirmButtonContainer}
            onPress={() => {
              onChange({
                status: statusRef.current,
                orderBy: orderByRef.current,
              })
              buttonSheetRef.current?.close()
            }}>
            Confrim
          </Button>
        </View>
      </BottomSheet>
    </>
  )
}
