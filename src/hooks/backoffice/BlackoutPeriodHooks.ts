import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import Toast from 'react-native-toast-message'
import {z} from 'zod'

import {useNavigate} from '@hooks/CommonHooks'
import {
  BlackoutPeriodCreateProps,
  BlackoutPeriodForm,
  BlackoutPeriodItem,
  BlackoutPeriodUpdateProps,
} from '@models/backoffice/BlackoutPeriod'
import BlackoutPeriodService from '@services/backoffice/BlackoutPeriodService'

export function useQueryBlackoutPeriodList(
  page: number,
  orderBy: 'ASC' | 'DESC' = 'DESC',
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 10 * 1000,
  initialValue?: {data: BlackoutPeriodItem[]; last: number},
) {
  initialValue = initialValue ?? {data: [], last: 1}
  const result = useQuery({
    queryKey: [
      'blackout-period-list',
      page,
      orderBy,
      startCreatedAt,
      stopCreatedAt,
    ],
    queryFn: async () =>
      await BlackoutPeriodService.getList(
        page,
        15,
        'date',
        orderBy,
        undefined,
        startCreatedAt,
        stopCreatedAt,
      ),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })

  return {...result, data: result.data ?? initialValue}
}

export function useQueryBlackoutPeriodById(
  id: number,
  staleTime: number = 5 * 1000,
) {
  return useQuery({
    queryKey: ['blackout-period', id],
    queryFn: async () => await BlackoutPeriodService.getById(id),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })
}

export function useBlackoutPeriodCreateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: async (blackoutPeriod: BlackoutPeriodCreateProps) =>
      await BlackoutPeriodService.create(blackoutPeriod),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'BlackoutPeriodList'})
      Toast.show({
        type: 'success',
        text1: 'Create successfully.',
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

export function useBlackoutPeriodUpdateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: async (blackoutPeriod: BlackoutPeriodUpdateProps) =>
      await BlackoutPeriodService.update(blackoutPeriod),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'BlackoutPeriodList'})
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

export function useBlackoutPeriodDeleteMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: async (id: number) => await BlackoutPeriodService.delete(id),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'BlackoutPeriodList'})
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

export const blackoutPeriodSchema = z.object({
  id: z.number().default(0),
  date: z.string(),
  time_range: timeRangeSchema,
})

export type BlackoutPeriodFormData = z.infer<typeof blackoutPeriodSchema>

export function useBlackoutPeriodForm(blackoutPeriod?: BlackoutPeriodForm) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<BlackoutPeriodFormData>({
    resolver: zodResolver(blackoutPeriodSchema),
    defaultValues: blackoutPeriod,
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
