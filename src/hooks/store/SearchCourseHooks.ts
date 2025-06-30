import {useQuery} from '@tanstack/react-query'

import {SearchCourseItem} from '@models/store/SearchCourseTypes'
import SearchCourseService from '@services/store/SearchCourseService'

export function useQueryCourseList(
  search?: string,
  categoryId?: number,
  minPrice?: number,
  maxPrice?: number,
  page: number = 1,
  orderBy: 'ASC' | 'DESC' = 'DESC',
  staleTime: number = 20 * 1000,
  initialValue?: {data: SearchCourseItem[]; last: 1; total: 0},
) {
  initialValue = initialValue ?? {data: [], last: 1, total: 0}
  const result = useQuery({
    queryKey: [
      'search-course-list',
      search,
      categoryId,
      minPrice,
      maxPrice,
      page,
      orderBy,
    ],
    queryFn: async () =>
      await SearchCourseService.getList(
        search,
        categoryId,
        minPrice,
        maxPrice,
        page,
        8,
        'price',
        orderBy,
      ),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })

  return {...result, data: result.data ?? initialValue}
}
