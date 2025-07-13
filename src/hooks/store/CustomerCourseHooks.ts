import {useQuery} from '@tanstack/react-query'

import {CustomerCourseStatus} from '@enums/StatusEnums'
import {CustomerCourseList} from '@models/store/CustomerCourseTypes'
import CustomerCourseService from '@services/store/CustomerCourseService'

export function useQueryCustomerCourseList(
  page: number,
  orderBy: 'ASC' | 'DESC',
  status?: CustomerCourseStatus,
  staleTime: number = 10 * 1000,
  initialValue?: CustomerCourseList,
) {
  initialValue = initialValue ?? {data: [], last: 1, total: 0}
  const result = useQuery({
    queryKey: ['store-customer-course-list', status, page, orderBy],
    queryFn: async () =>
      await CustomerCourseService.getList(
        status,
        page,
        15,
        'created_at',
        orderBy,
      ),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })

  return {...result, data: result.data ?? initialValue}
}
