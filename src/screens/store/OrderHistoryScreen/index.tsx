import React, {useCallback, useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import HeaderBar from '@components/HeaderBar'
import TableCardPagination from '@components/TableCardPagination'
import {useTheme} from '@context-providers/ThemeProvider'
import {OrderStatusEnum} from '@enums/StatusEnums'
import {useRefresh} from '@hooks/CommonHooks'
import {useQueryOrderList} from '@hooks/store/OrderHooks'

import Filter from './Components/Filter'
import OrderCardItem from './Components/OrderCardItem'
import {getStyles} from './styles'

export default function OrderHistoryScreen() {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<OrderStatusEnum | undefined>(undefined)
  const [orderBy, setOrderBy] = useState<'ASC' | 'DESC'>('DESC')

  const {
    data: orders,
    isFetching: isLoading,
    refetch,
  } = useQueryOrderList(page, status, orderBy)

  const {refreshing, onRefresh} = useRefresh(() => {
    setPage(1)
    setStatus(undefined)
    setOrderBy('DESC')
    refetch()
  })

  const onChangeFilter = useCallback((value: any) => {
    setStatus(value.status)
    setOrderBy(value.orderBy)
    setPage(1)
  }, [])

  return (
    <View style={styles.container}>
      <HeaderBar title='Order History' containerStyle={styles.headerBar} />
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Filter
          initialStatus={status}
          initialOrderBy={orderBy}
          searchCount={orders.total}
          onChange={onChangeFilter}
        />
        {isLoading ? (
          <View style={styles.skeletonContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            {orders.data.map((order, index) => {
              return <OrderCardItem key={index} order={order} />
            })}
            {orders.data.length !== 0 ? (
              <TableCardPagination
                current={page}
                last={orders.last}
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
