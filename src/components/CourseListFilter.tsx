import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

import Button from '@components/Button'
import ButtonGroup from '@components/ButtonGroup'
import Dropdown from '@components/Dropdown'
import FilterResponsive from '@components/FilterResponsive'
import ResponsiveSwitcher from '@components/ResponsiveSwitcher'
import SearchBar from '@components/SearchBar'
import {useTheme} from '@context-providers/ThemeProvider'
import {CourseStatus} from '@enums/ModelStatus'
import {useNavigate} from '@hooks/CommonHooks'
import {AdaptiveMD3Theme} from '@models/ThemeInterface'
import {getFirstOrValue} from '@utils/Helpers'

const statusData = [
  {label: 'Active', value: 'active'},
  {label: 'Inactive', value: 'inactive'},
]

const orderByData = [
  {label: 'Ascending', value: 'ASC'},
  {label: 'Descending', value: 'DESC'},
]

export default function CourseListFilter({
  onChange,
  status,
  orderBy = 'DESC',
}: {
  onChange: (type: string, value: any) => void
  status?: CourseStatus
  orderBy?: 'ASC' | 'DESC'
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  return (
    <View style={styles.container}>
      <SearchBar
        placeHolder='Search by id or name'
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
      <FilterResponsive>
        <ResponsiveSwitcher
          commonProps={{
            data: statusData,
            placeholder: 'Status',
            onChange: value => {
              const val = getFirstOrValue(value)
              onChange('Status', val)
            },
          }}
          mobileProps={{
            initialValue: status,
          }}
          mobile={ButtonGroup}
          tablet={Dropdown}
        />
        <ResponsiveSwitcher
          commonProps={{
            data: orderByData,
            placeholder: 'Order By',
            onChange: value => {
              const val = getFirstOrValue(value)
              onChange('OrderBy', val)
            },
          }}
          mobileProps={{
            initialValue: orderBy,
          }}
          mobile={ButtonGroup}
          tablet={Dropdown}
        />
      </FilterResponsive>
    </View>
  )
}

function getStyles(theme: AdaptiveMD3Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 20,
      marginTop: 20,
    },
    createButtonContainer: {
      width: 110,
      borderRadius: 10,
    },
    createButtonIcon: {
      width: 16,
      color: theme.colors.onPrimary,
    },
  })
}
