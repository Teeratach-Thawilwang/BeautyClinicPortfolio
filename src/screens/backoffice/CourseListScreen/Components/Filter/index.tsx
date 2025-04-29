import React, {useRef} from 'react'
import {Text, View} from 'react-native'

import BottomSheet from '@components/BottomSheet'
import Button from '@components/Button'
import ButtonChoice from '@components/ButtonChoice'
import Dropdown from '@components/Dropdown'
import DropdownDatePicker from '@components/DropdownDatePicker'
import SearchBar from '@components/SearchBar'
import SingleDateTimePicker from '@components/SingleDateTimePicker'
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
  const {responsive} = useResponsiveScreen()
  const buttonSheetRef = createBottomSheetRef()
  const statusRef = useRef<string | undefined>()
  const orderByRef = useRef<string | undefined>()
  const startCreatedAtRef = useRef<Date | undefined>()
  const stopCreatedAtRef = useRef<Date | undefined>()

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
          <BottomSheet
            ref={buttonSheetRef}
            onDismiss={() => {
              onChange('SetAll', {
                status: statusRef.current,
                orderBy: orderByRef.current,
                startCreatedAt: startCreatedAtRef.current,
                stopCreatedAt: stopCreatedAtRef.current,
              })
            }}>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemLabel}>Status</Text>
              <ButtonChoice
                choices={statusChoices}
                initialValue={initialStatus}
                onChange={value => {
                  statusRef.current = getFirstOrValue(value)
                }}
              />
            </View>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemLabel}>Order by</Text>
              <ButtonChoice
                choices={orderByChoices}
                initialValue={initialOrderBy}
                onChange={value => {
                  orderByRef.current = getFirstOrValue(value)
                }}
              />
            </View>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemLabel}>Start created date</Text>
              <View style={styles.datePickerContainer}>
                <SingleDateTimePicker
                  mode='date'
                  initialDate={initialStartCreatedAt}
                  onChange={date => {
                    startCreatedAtRef.current = date
                  }}
                />
              </View>
            </View>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemLabel}>Stop created date</Text>
              <View style={styles.datePickerContainer}>
                <SingleDateTimePicker
                  mode='date'
                  initialDate={initialStopCreatedAt}
                  onChange={date => {
                    stopCreatedAtRef.current = date
                  }}
                />
              </View>
            </View>
            <View style={styles.bottomSheetSpaceBotton} />
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
