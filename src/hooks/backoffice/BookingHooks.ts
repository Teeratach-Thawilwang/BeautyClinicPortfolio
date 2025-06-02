import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import Toast from 'react-native-toast-message'
import {z} from 'zod'

import {BookingStatus} from '@enums/StatusEnums'
import {useNavigate} from '@hooks/CommonHooks'
import {
  BookingForm,
  BookingListItem,
  BookingUpdateProps,
} from '@models/BookingTypes'
import BookingService from '@services/BookingService'

export function useQueryBookingList(
  search: string,
  page: number,
  orderBy: 'ASC' | 'DESC',
  status?: BookingStatus,
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 30 * 1000,
  initialValue?: {data: BookingListItem[]; last: number},
) {
  initialValue = initialValue ?? {data: [], last: 1}
  const result = useQuery({
    queryKey: [
      'booking-list',
      search,
      page,
      orderBy,
      status,
      startCreatedAt,
      stopCreatedAt,
    ],
    queryFn: async () =>
      await BookingService.getList(
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

export function useQueryBookingById(
  bookingId: number,
  staleTime: number = 5 * 1000,
) {
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => await BookingService.getById(bookingId),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })
}

export function useBookingUpdateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: (booking: BookingUpdateProps) => BookingService.update(booking),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'BookingList'})
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

export function useBookingDeleteMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: (id: number) => BookingService.delete(id),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'BookingList'})
      Toast.show({
        type: 'success',
        text1: 'Delete successfully.',
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

export const timeRangeSchema = z.object({
  start: z.string(),
  end: z.string(),
})

export const bookingSchema = z.object({
  id: z.number().default(0),
  user_id: z.string(),
  course_id: z.number(),
  booking_date: z.string(),
  booking_time: timeRangeSchema,
  status: z.enum([
    BookingStatus.Cancelled,
    BookingStatus.Incoming,
    BookingStatus.Completed,
  ]),
})

export type BookingFormData = z.infer<typeof bookingSchema>

export function useBookingForm(booking?: BookingForm) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: booking,
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
