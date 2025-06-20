import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import Toast from 'react-native-toast-message'
import {z} from 'zod'

import {OrderStatusEnum} from '@enums/StatusEnums'
import {useNavigate} from '@hooks/CommonHooks'
import {
  OrderForm,
  OrderListItem,
  OrderUpdateProps,
} from '@models/backoffice/OrderTypes'
import OrderService from '@services/backoffice/OrderService'

export function useQueryOrderList(
  search: string,
  page: number,
  orderBy: 'ASC' | 'DESC',
  status?: OrderStatusEnum,
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 30 * 1000,
  initialValue?: {data: OrderListItem[]; last: number},
) {
  initialValue = initialValue ?? {data: [], last: 1}
  const result = useQuery({
    queryKey: [
      'order-list',
      search,
      page,
      orderBy,
      status,
      startCreatedAt,
      stopCreatedAt,
    ],
    queryFn: async () =>
      await OrderService.getList(
        search,
        page,
        15,
        'id',
        orderBy,
        status,
        startCreatedAt,
        stopCreatedAt,
      ),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })

  return {...result, data: result.data ?? initialValue}
}

export function useQueryOrderById(id: number, staleTime: number = 5 * 1000) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => await OrderService.getById(id),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })
}

export function useOrderUpdateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: async (order: OrderUpdateProps) =>
      await OrderService.update(order),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'OrderList'})
      Toast.show({
        type: 'success',
        text1: 'Update successfully.',
      })
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Update failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}

export const orderSchema = z.object({
  status: z.enum([
    OrderStatusEnum.Created,
    OrderStatusEnum.Ongoing,
    OrderStatusEnum.Completed,
    OrderStatusEnum.Cancel,
  ]),
})

export type OrderFormData = z.infer<typeof orderSchema>

export function useOrderForm(order?: OrderForm) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: order,
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
