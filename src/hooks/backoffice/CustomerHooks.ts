import {useQuery} from '@tanstack/react-query'

import {CustomerItem} from '@models/CustomerType'
import CustomerService from '@services/CustomerService'

export function useQueryCustomerList(
  search: string,
  page: number,
  orderBy: 'ASC' | 'DESC',
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 5 * 1000,
  initialValue?: {data: CustomerItem[]; last: number},
) {
  initialValue = initialValue ?? {data: [], last: 1}
  const result = useQuery({
    queryKey: [
      'customer-list',
      search,
      page,
      'created_at',
      orderBy,
      startCreatedAt,
      stopCreatedAt,
    ],
    queryFn: async () =>
      await CustomerService.getList(
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
