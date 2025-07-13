import {useMutation, useQuery} from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import {
  BookingList,
  CreateBookingProps,
  UpdateBookingProps,
} from '@models/store/BookingTypes'
import BookingService from '@services/store/BookingService'

export function useQueryBookingList(
  page: number,
  orderBy: 'ASC' | 'DESC',
  staleTime: number = 10 * 1000,
  initialValue?: BookingList,
) {
  initialValue = initialValue ?? {data: [], last: 1, total: 0}
  const result = useQuery({
    queryKey: ['store-booking-list', page, orderBy],
    queryFn: async () =>
      await BookingService.getList(page, 15, 'booking_date', orderBy),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })

  return {...result, data: result.data ?? initialValue}
}

export function useCreateBookingMutation() {
  const mutation = useMutation({
    mutationFn: async (params: CreateBookingProps) =>
      await BookingService.create(params),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Create booking successfully.',
      })
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Create booking failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}

export function useUpdateBookingMutation() {
  const mutation = useMutation({
    mutationFn: async (params: UpdateBookingProps) =>
      await BookingService.update(params),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Update booking successfully.',
      })
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Update booking failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}

export function useCancelBookingMutation() {
  const mutation = useMutation({
    mutationFn: async (id: number) => await BookingService.delete(id),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Cancel booking successfully.',
      })
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Cancel booking failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}

export function useGetBookingTimeAvailableMutation() {
  const mutation = useMutation({
    mutationFn: async ({
      customerCourseId,
      date,
    }: {
      customerCourseId: number
      date: string
    }) => await BookingService.getBookingTimeAvailable(customerCourseId, date),
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Get booking time available failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}
