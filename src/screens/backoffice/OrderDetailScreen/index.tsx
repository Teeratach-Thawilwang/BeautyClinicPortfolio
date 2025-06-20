import React from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'

import {useTheme} from '@context-providers/ThemeProvider'
import {useRefresh} from '@hooks/CommonHooks'
import {
  OrderFormData,
  useOrderUpdateMutation,
  useQueryOrderById,
} from '@hooks/backoffice/OrderHooks'
import {OrderUpdateProps} from '@models/backoffice/OrderTypes'
import {OrderDetailRouteProp} from '@navigation/backoffice/BackOfficeNavigator'

import OrderForm from './Components'
import {getStyles} from './styles'

export default function OrderDetailScreen({
  route,
}: {
  route: OrderDetailRouteProp
}) {
  const {theme} = useTheme()
  const styles = getStyles(theme)

  const {
    data: order,
    isFetching: isLoading,
    refetch: refetch,
  } = useQueryOrderById(route.params.orderId)

  const {mutateAsync: updateMutate} = useOrderUpdateMutation()

  const {refreshing, onRefresh} = useRefresh(() => {
    refetch()
  })

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {isLoading ? (
        <View style={styles.skeletonContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <OrderForm
          key={route.params.orderId}
          onSubmit={async (formData: OrderFormData) => {
            const updateParams: OrderUpdateProps = {
              id: route.params.orderId,
              ...formData,
            }
            await updateMutate(updateParams)
          }}
          order={order!}
        />
      )}
    </ScrollView>
  )
}
