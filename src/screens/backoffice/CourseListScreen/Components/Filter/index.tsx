import React, {useRef, useState} from 'react'
import {Text, View} from 'react-native'
import {IconButton} from 'react-native-paper'

import BottomSheet from '@components/BottomSheet'
import Button from '@components/Button'
import ButtonChoice from '@components/ButtonChoice'
import DateTimePicker from '@components/DateTimePicker'
import Dropdown from '@components/Dropdown'
import DropdownDatePicker from '@components/DropdownDatePicker'
import SearchBar from '@components/SearchBar'
import {useTheme} from '@context-providers/ThemeProvider'
import {
  createBottomSheetRef,
  useNavigate,
  useResponsiveScreen,
} from '@hooks/CommonHooks'
import {getFirstOrValue} from '@utils/Helpers'

import {getStyles} from './styles'
import {Props} from './types'

const statusChoices = [
  {label: 'Active', value: 'active'},
  {label: 'Inactive', value: 'inactive'},
]

const orderByChoices = [
  {label: 'Ascending', value: 'ASC'},
  {label: 'Descending', value: 'DESC'},
]

export default function Filter({
  onChange,
  initialStatus,
  initialOrderBy = 'DESC',
  initialStartCreatedAt,
  initialStopCreatedAt,
  refreshing,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {width, responsive} = useResponsiveScreen()
  const buttonSheetRef = createBottomSheetRef()
  const statusRef = useRef<string | undefined>()
  const orderByRef = useRef<string | undefined>()
  const startCreatedAtRef = useRef<Date | undefined>()
  const stopCreatedAtRef = useRef<Date | undefined>()
  const [resetFilter, setResetFilter] = useState(false)

  return (
    <View style={styles.container}>
      <SearchBar
        key={`${refreshing}-search`}
        placeholder='Search by id or name'
        onSearch={text => onChange('Search', text)}
      />
      <Button
        onPress={() =>
          navigation.navigate('BackOfficeScreens', {
            screen: 'CourseCreate',
          })
        }
        icon='fa-plus'
        containerStyle={styles.createButtonContainer}
        iconStyle={styles.createButtonIcon}>
        Create
      </Button>

      {responsive == 'MOBILE' ? (
        <>
          <Button
            mode='outlined'
            containerStyle={styles.filterButtonContainer}
            labelStyle={styles.filterButtonLabel}
            iconStyle={styles.filterButtonIcon}
            onPress={() => {
              buttonSheetRef.current?.present()
            }}
            icon='filter-variant'>
            Filter
          </Button>
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
              <Text style={styles.filterItemLabel}>Status</Text>
              <ButtonChoice
                key={`bottomsheet-status-${resetFilter}`}
                data={statusChoices}
                initialValue={initialStatus ? [initialStatus] : undefined}
                onChange={values => {
                  statusRef.current = getFirstOrValue<string>(
                    values as string[],
                  )
                }}
                buttonContainerStyle={styles.buttomChoiceContainer}
                activeButtonContainerStyle={styles.activeButtomChoiceContainer}
              />
            </View>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemLabel}>Order by</Text>
              <ButtonChoice
                key={`bottomsheet-orderby-${resetFilter}`}
                data={orderByChoices}
                initialValue={[initialOrderBy]}
                onChange={values => {
                  orderByRef.current = getFirstOrValue<string>(
                    values as string[],
                  )
                }}
                buttonContainerStyle={styles.buttomChoiceContainer}
                activeButtonContainerStyle={styles.activeButtomChoiceContainer}
              />
            </View>
            <View style={styles.filterDateContainer}>
              <Text style={styles.filterDateLabel}>Created date</Text>
              <DateTimePicker
                key={`bottomsheet-created-at-${resetFilter}`}
                mode='range'
                containerHeight={width - 20 - 20}
                initialStartDate={initialStartCreatedAt}
                initialEndDate={initialStopCreatedAt}
                onChange={data => {
                  startCreatedAtRef.current = data.startDate as Date | undefined
                  stopCreatedAtRef.current = data.endDate as Date | undefined
                }}
              />
            </View>
            <View style={styles.bottomSheetButtons}>
              <Button
                containerStyle={styles.resetButtonContainer}
                labelStyle={styles.resetButtonLabel}
                onPress={() => {
                  onChange('SetAll', {
                    status: undefined,
                    orderBy: 'DESC',
                    startCreatedAt: undefined,
                    stopCreatedAt: undefined,
                  })
                  statusRef.current = undefined
                  orderByRef.current = undefined
                  startCreatedAtRef.current = undefined
                  stopCreatedAtRef.current = undefined
                  setResetFilter(val => !val)
                }}>
                Reset
              </Button>
              <Button
                containerStyle={styles.confirmButtonContainer}
                onPress={() => {
                  onChange('SetAll', {
                    status: statusRef.current,
                    orderBy: orderByRef.current,
                    startCreatedAt: startCreatedAtRef.current,
                    stopCreatedAt: stopCreatedAtRef.current,
                  })
                  buttonSheetRef.current?.close()
                }}>
                Confrim
              </Button>
            </View>
          </BottomSheet>
        </>
      ) : (
        <>
          <Dropdown
            key={`${refreshing}-status`}
            data={statusChoices}
            placeholder='Status'
            onChange={value => {
              const val = getFirstOrValue(value)
              onChange('Status', val)
            }}
          />
          <Dropdown
            key={`${refreshing}-orderby-dropdown`}
            data={orderByChoices}
            placeholder='Order by'
            onChange={value => {
              const val = getFirstOrValue(value)
              onChange('OrderBy', val)
            }}
          />
          <DropdownDatePicker
            key={`${refreshing}-datepicker-dropdown`}
            mode='range'
            placeholder='Created at'
            onChange={data => {
              onChange('SetRangeCreatedAt', {
                startCreatedAt: data.startDate,
                stopCreatedAt: data.endDate,
              })
            }}
          />
        </>
      )}
    </View>
  )
}
