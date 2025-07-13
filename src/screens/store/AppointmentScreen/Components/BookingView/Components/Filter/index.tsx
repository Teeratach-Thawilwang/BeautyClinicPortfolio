import React, {useRef, useState} from 'react'
import {Text, View} from 'react-native'
import {IconButton} from 'react-native-paper'

import BottomSheet from '@components/BottomSheet'
import Button from '@components/Button'
import ButtonChoice from '@components/ButtonChoice'
import SearchFilterBar from '@components/SearchFilterBar'
import {useTheme} from '@context-providers/ThemeProvider'
import {createBottomSheetRef} from '@hooks/CommonHooks'
import {getFirstOrValue} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

const orderByChoices = [
  {label: 'น้อยไปมาก', value: 'ASC'},
  {label: 'มากไปน้อย', value: 'DESC'},
]

export default function Filter({
  onChange,
  initialOrderBy = 'DESC',
  searchCount,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const buttonSheetRef = createBottomSheetRef()
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
                orderBy: 'DESC',
              })
              orderByRef.current = undefined
              setResetFilter(val => !val)
            }}>
            Reset
          </Button>
          <Button
            containerStyle={styles.confirmButtonContainer}
            onPress={() => {
              onChange({
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
