import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import Toast from 'react-native-toast-message'
import {z} from 'zod'

import {CourseStatus} from '@enums/StatusEnums'
import {useNavigate} from '@hooks/CommonHooks'
import {
  Course,
  CourseCreateProps,
  CourseListItem,
  CourseUpdateProps,
} from '@models/backoffice/CourseTypes'
import CourseService from '@services/backoffice/CourseService'

export function useQueryCourses(
  search: string,
  page: number,
  orderBy: 'ASC' | 'DESC',
  status?: CourseStatus,
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 30 * 1000,
  initialValue?: {data: CourseListItem[]; last: number},
) {
  initialValue = initialValue ?? {data: [], last: 1}
  const result = useQuery({
    queryKey: [
      'courses',
      search,
      page,
      orderBy,
      status,
      startCreatedAt,
      stopCreatedAt,
    ],
    queryFn: async () =>
      await CourseService.getList(
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

export function useQueryCourseById(
  courseId: number,
  staleTime: number = 5 * 1000,
) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => await CourseService.getById(courseId),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })
}

export function useCourseCreateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: async (course: CourseCreateProps) =>
      await CourseService.create(course),
    onSuccess: () => {
      navigation.push('BackOfficeScreens', {screen: 'CourseList'})
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

export function useCourseUpdateMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: async (course: CourseUpdateProps) =>
      await CourseService.update(course),
    onSuccess: () => {
      navigation.replace('BackOfficeScreens', {screen: 'CourseList'})
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

export function useCourseDeleteMutation() {
  const navigation = useNavigate()
  const mutation = useMutation({
    mutationFn: async (id: number) => await CourseService.delete(id),
    onSuccess: () => {
      navigation.replace('BackOfficeScreens', {screen: 'CourseList'})
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

export const workingTimeSchema = z
  .array(
    z.object({
      start: z.string(),
      end: z.string(),
    }),
  )
  .default([])

export const courseImageSchema = z
  .array(
    z.object({
      uri: z.string(),
      type: z.string(),
    }),
  )
  .default([])

export const courseSchema = z.object({
  id: z.number().default(0),
  name: z.string().min(2),
  description: z.string().min(2),
  status: z.enum([CourseStatus.Active, CourseStatus.Inactive]),
  category_id: z.number(),
  price: z.number().min(0),
  images: courseImageSchema,
  treatment_rounds: z.number().int().min(0),
  duration_per_round: z.number().multipleOf(0.5).min(0.5),
  booking_limit_per_round: z.number().int().min(0),
  appointment_editable_before: z.number().int().min(0),
  working_time_monday: workingTimeSchema,
  working_time_tuesday: workingTimeSchema,
  working_time_wednesday: workingTimeSchema,
  working_time_thursday: workingTimeSchema,
  working_time_friday: workingTimeSchema,
  working_time_saturday: workingTimeSchema,
  working_time_sunday: workingTimeSchema,
})

export type CourseFormData = z.infer<typeof courseSchema>

export function useCourseForm(course?: Course) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: course,
  })

  return {
    control,
    handleSubmit,
    errors,
  }
}
