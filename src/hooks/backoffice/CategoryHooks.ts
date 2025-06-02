import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import Toast from 'react-native-toast-message'
import {z} from 'zod'

import {CategoryStatus} from '@enums/StatusEnums'
import {useNavigate} from '@hooks/CommonHooks'
import {
  Category,
  CategoryCreateProps,
  CategoryListItem,
  CategoryUpdateProps,
} from '@models/CategoryTypes'
import CategoryService from '@services/CategoryService'

export function useQueryCategories(
  search: string,
  page: number,
  orderBy: 'ASC' | 'DESC',
  status?: CategoryStatus,
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 30 * 1000,
  initialValue?: {data: CategoryListItem[]; last: number},
) {
  initialValue = initialValue ?? {data: [], last: 1}
  const result = useQuery({
    queryKey: [
      'categories',
      search,
      page,
      orderBy,
      status,
      startCreatedAt,
      stopCreatedAt,
    ],
    queryFn: async () =>
      await CategoryService.getList(
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

export function useQueryAllActiveCategories(staleTime: number = 60 * 1000) {
  return useQuery({
    queryKey: ['categories_all_status_active'],
    queryFn: async () => await CategoryService.getAllActive(),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })
}

export function useQueryCategoryById(
  categoryId: number,
  staleTime: number = 5 * 1000,
) {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => await CategoryService.getById(categoryId),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })
}

export function useCategoryCreateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: (category: CategoryCreateProps) =>
      CategoryService.create(category),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'CategoryList'})
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

export function useCategoryUpdateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: (category: CategoryUpdateProps) =>
      CategoryService.update(category),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'CategoryList'})
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

export function useCategoryDeleteMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: (id: number) => CategoryService.delete(id),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'CategoryList'})
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

export const courseImageSchema = z
  .array(
    z.object({
      uri: z.string(),
      type: z.string(),
    }),
  )
  .default([])

export const categorySchema = z.object({
  id: z.number().default(0),
  name: z.string().min(2),
  status: z.enum([CategoryStatus.Active, CategoryStatus.Inactive]),
  images: courseImageSchema,
})

export type CategoryFormData = z.infer<typeof categorySchema>

export function useCategoryForm(category?: Category) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category,
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
