import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import Toast from 'react-native-toast-message'
import {z} from 'zod'

import {useNavigate} from '@hooks/CommonHooks'
import {Admin, AdminForm} from '@models/AdminTypes'
import AdminService from '@services/AdminService'

export function useQueryAdminList(
  search: string,
  page: number,
  orderBy: 'ASC' | 'DESC',
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 5 * 1000,
  initialValue?: {data: Admin[]; last: number},
) {
  initialValue = initialValue ?? {data: [], last: 1}
  const result = useQuery({
    queryKey: [
      'admin-list',
      search,
      page,
      'created_at',
      orderBy,
      startCreatedAt,
      stopCreatedAt,
    ],
    queryFn: async () =>
      await AdminService.getList(
        search,
        page,
        15,
        'created_at',
        orderBy,
        startCreatedAt,
        stopCreatedAt,
      ),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })

  return {...result, data: result.data ?? initialValue}
}

export function useAdminCreateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: async (email: string) => await AdminService.create(email),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'AdminList'})
      Toast.show({
        type: 'success',
        text1: 'Create successfully.',
      })
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Create failed.',
        text2: error.message,
      })
    },
  })
  return mutation
}

export function useAdminDeleteMutation(onSuccess: () => void) {
  const mutation = useMutation({
    mutationFn: async (uuid: string) => await AdminService.delete(uuid),
    onSuccess: () => {
      onSuccess()
      Toast.show({
        type: 'success',
        text1: 'Delete successfully.',
      })
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Delete failed.',
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

export const adminSchema = z.object({
  email: z.string().email(),
})

export type AdminFormData = z.infer<typeof adminSchema>

export function useAdminForm(admin?: AdminForm) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<AdminFormData>({
    resolver: zodResolver(adminSchema),
    defaultValues: admin,
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
