import React, {useCallback, useEffect, useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import TableCardPagination from '@components/TableCardPagination'
import {useTheme} from '@context-providers/ThemeProvider'
import {useRefresh} from '@hooks/CommonHooks'
import {useQueryBookingList} from '@hooks/store/BookingHooks'
import AuthService from '@services/AuthService'

import GuestSignin from '../GuestSignin'
import BookingItem from './Components/BookingItem'
import Filter from './Components/Filter'
import {getStyles} from './styles'

export default function BookingView() {
  const {theme} = useTheme()
  const styles = getStyles(theme)
  const isSignIn = AuthService.getIsSignIn()

  const [page, setPage] = useState(1)
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('DESC')

  const {
    data: bookings,
    isFetching: isLoading,
    refetch,
  } = useQueryBookingList(page, orderBy)

  const {refreshing, onRefresh} = useRefresh(() => {
    setPage(1)
    setOrderBy('DESC')
    refetch()
  })

  const onChangeFilter = useCallback((value: any) => {
    setPage(1)
    setOrderBy(value.orderBy)
  }, [])

  useEffect(() => {
    onRefresh()
  }, [isSignIn])

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {isSignIn ? (
          <Filter
            initialOrderBy={orderBy}
            searchCount={bookings.total}
            onChange={onChangeFilter}
          />
        ) : (
          <GuestSignin />
        )}
        {isLoading ? (
          <View style={styles.skeletonContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            {bookings.data.map((booking, index) => {
              return (
                <BookingItem
                  key={index}
                  booking={booking}
                  onCancel={() => onRefresh()}
                />
              )
            })}
            {bookings.data.length !== 0 ? (
              <TableCardPagination
                current={page}
                last={bookings.last}
                onPress={page => {
                  setPage(page)
                }}
              />
            ) : null}
          </>
        )}
      </ScrollView>
    </View>
  )
}
