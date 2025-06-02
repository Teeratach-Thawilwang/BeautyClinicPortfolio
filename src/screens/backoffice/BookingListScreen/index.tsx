import React, {useCallback, useState} from 'react'
import {Keyboard, RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import TableResponsive from '@components/TableResponsive'
import {useTheme} from '@context-providers/ThemeProvider'
import {useNavigate, useRefresh} from '@hooks/CommonHooks'
import {useQueryBookingList} from '@hooks/backoffice/BookingHooks'

import Filter from './Components/Filter'
import {getStyles} from './styles'

export default function BookingListScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const navigation = useNavigate()

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState(undefined)
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('DESC')
  const [startCreatedAt, setStartCreatedAt] = useState<Date | undefined>(
    undefined,
  )
  const [stopCreatedAt, setStopCreatedAt] = useState<Date | undefined>(
    undefined,
  )

  const {
    data: bookings,
    isFetching: isLoading,
    refetch,
  } = useQueryBookingList(
    search,
    page,
    orderBy,
    status,
    startCreatedAt,
    stopCreatedAt,
  )

  const {refreshing, onRefresh} = useRefresh(() => {
    setSearch('')
    setPage(1)
    setStatus(undefined)
    setOrderBy('DESC')
    setStartCreatedAt(undefined)
    setStopCreatedAt(undefined)
    refetch()
  })

  const onChangeFilter = useCallback((type: string, value: any) => {
    switch (type) {
      case 'Search':
        setSearch(value)
        setPage(1)
        break
      case 'Status':
        setStatus(value)
        setPage(1)
        break
      case 'OrderBy':
        setOrderBy(value)
        setPage(1)
        break
      case 'StartCreatedAt':
        setStartCreatedAt(value)
        setPage(1)
        break
      case 'StopCreatedAt':
        setStopCreatedAt(value)
        setPage(1)
        break
      case 'SetRangeCreatedAt':
        setStartCreatedAt(value.startCreatedAt)
        setStopCreatedAt(value.stopCreatedAt)
        setPage(1)
        break
      case 'SetAll':
        setStatus(value.status)
        setOrderBy(value.orderBy)
        setStartCreatedAt(value.startCreatedAt)
        setStopCreatedAt(value.stopCreatedAt)
        setPage(1)
        break
    }
  }, [])

  const tableHeaders = [
    'ID',
    'User ID',
    'Course ID',
    'Booking date',
    'Booking time',
    'Status',
    'Created at',
  ]
  const searchEmpty = search.length != 0
  const bookingNotEmpty = bookings?.data.length != 0

  if (!isLoading && searchEmpty && bookingNotEmpty) Keyboard.dismiss()

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Filter
        refreshing={refreshing}
        initialStatus={status}
        initialOrderBy={orderBy}
        initialStartCreatedAt={startCreatedAt}
        initialStopCreatedAt={stopCreatedAt}
        onChange={onChangeFilter}
      />
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <TableResponsive
          headers={tableHeaders}
          data={bookings.data}
          isLoading={isLoading}
          onRowPress={row =>
            navigation.navigate('BackOfficeScreens', {
              screen: 'BookingDetail',
              params: {bookingId: row.id},
            })
          }
          current={page}
          last={bookings.last}
          onPaginatePress={page => setPage(page)}
        />
      )}
    </ScrollView>
  )
}
