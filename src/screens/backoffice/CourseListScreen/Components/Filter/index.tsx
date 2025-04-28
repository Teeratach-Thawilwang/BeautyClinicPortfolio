import React from 'react'
import {Text, View} from 'react-native'

import BottomSheet from '@components/BottomSheet'
import Button from '@components/Button'
import ButtonChoice from '@components/ButtonChoice'
import Dropdown from '@components/Dropdown'
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
  refreshing,
}: Props) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const {responsive} = useResponsiveScreen()
  const buttonSheetRef = createBottomSheetRef()

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
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemLabel}>Status</Text>
              <ButtonChoice
                choices={statusChoices}
                initialValue={initialStatus}
                onChange={value => {
                  const val = getFirstOrValue(value)
                  onChange('Status', val)
                }}
              />
            </View>
            <View style={styles.filterItemContainer}>
              <Text style={styles.filterItemLabel}>Order by</Text>
              <ButtonChoice
                choices={orderByChoices}
                initialValue={initialOrderBy}
                onChange={value => {
                  const val = getFirstOrValue(value)
                  onChange('OrderBy', val)
                }}
              />
            </View>
            <View style={styles.bottomSheetSpaceBotton} />
          </BottomSheet>
        </>
      ) : null}

      {responsive == 'TABLET' ? (
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
            key={`${refreshing}-dropdown`}
            data={orderByChoices}
            placeholder='Order by'
            onChange={value => {
              const val = getFirstOrValue(value)
              onChange('OrderBy', val)
            }}
          />
        </>
      ) : null}
    </View>
  )
}
