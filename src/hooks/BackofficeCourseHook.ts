import {useQuery} from '@tanstack/react-query'

import {CourseStatus} from '@enums/ModelStatus'
import CourseService from '@services/CourseService'

export function useCourses(
  search: string,
  page: number,
  orderBy: 'ASC' | 'DESC',
  status?: CourseStatus,
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 5 * 1000,
  initialValue: {data: []; last: number} = {data: [], last: 1},
) {
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
