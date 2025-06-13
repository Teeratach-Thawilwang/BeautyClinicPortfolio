import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import Toast from 'react-native-toast-message'
import {z} from 'zod'

import {CustomerCourseStatus} from '@enums/StatusEnums'
import {useNavigate} from '@hooks/CommonHooks'
import {
  CustomerCourse,
  CustomerCourseForm,
  CustomerCourseUpdateProps,
} from '@models/CustomerCourseType'
import CustomerCousreService from '@services/CustomerCousreService'

export function useQueryCustomerCourseList(
  customerId: string,
  page: number,
  orderBy: 'ASC' | 'DESC',
  status?: CustomerCourseStatus,
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 5 * 1000,
  initialValue?: {data: CustomerCourse[]; last: number},
) {
  initialValue = initialValue ?? {data: [], last: 1}
  const result = useQuery({
    queryKey: [
      'customer-course-list',
      customerId,
      page,
      orderBy,
      status,
      startCreatedAt,
      stopCreatedAt,
    ],
    queryFn: async () =>
      await CustomerCousreService.getList(
        customerId,
        page,
        15,
        'created_at',
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

export function useCustomerCourseUpdateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: async (course: CustomerCourseUpdateProps) =>
      await CustomerCousreService.update(course),
    onSuccess: () => {
      navigation.goBack()
      Toast.show({
        type: 'success',
        text1: 'Update successfully.',
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

export const customerCourseSchema = z.object({
  quota_round: z.number(),
  used_round: z.number(),
  status: z.enum([
    CustomerCourseStatus.Active,
    CustomerCourseStatus.Completed,
    CustomerCourseStatus.Expired,
  ]),
})

export type CustomerCourseFormData = z.infer<typeof customerCourseSchema>

export function useCustomerCourseForm(customerCourse?: CustomerCourseForm) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CustomerCourseFormData>({
    resolver: zodResolver(customerCourseSchema),
    defaultValues: customerCourse,
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
