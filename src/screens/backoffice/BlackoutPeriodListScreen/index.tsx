import React, {useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import Button from '@components/Button'
import TableResponsive from '@components/TableResponsive'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate, useRefresh} from '@hooks/CommonHooks'
import {useQueryBlackoutPeriodList} from '@hooks/backoffice/BlackoutPeriodHooks'

import {getStyles} from './styles'

export default function BlackoutPeriodListScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()
  const [page, setPage] = useState(1)

  const {
    data: blackoutPeriod,
    isFetching: isLoading,
    refetch,
  } = useQueryBlackoutPeriodList(page)

  const {refreshing, onRefresh} = useRefresh(() => {
    setPage(1)
    refetch()
  })

  const tableHeaders = ['ID', 'Date', 'Time', 'Status', 'Created at']

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Button
        onPress={() =>
          navigation.navigate('BackOfficeScreens', {
            screen: 'BlackoutPeriodCreate',
          })
        }
        icon='fa-plus'
        iconStyle={styles.createButtonIcon}
        containerStyle={styles.createButtonContainer}>
        Create
      </Button>
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <TableResponsive
          headers={tableHeaders}
          data={blackoutPeriod.data}
          isLoading={isLoading}
          onRowPress={row =>
            navigation.navigate('BackOfficeScreens', {
              screen: 'BlackoutPeriodDetail',
              params: {blackoutPeridId: row.id},
            })
          }
          current={page}
          last={blackoutPeriod.last}
          onPaginatePress={page => setPage(page)}
        />
      )}
    </ScrollView>
  )
}
