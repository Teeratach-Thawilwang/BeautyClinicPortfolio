import {useQuery} from '@tanstack/react-query'

import {CategoryStatus} from '@enums/StatusEnums'
import {CategoryListItem} from '@models/CategoryTypes'
import CategoryService from '@services/CategoryService'

export function useQueryCategories(
  search: string,
  page: number,
  orderBy: 'ASC' | 'DESC',
  status?: CategoryStatus,
  startCreatedAt?: Date,
  stopCreatedAt?: Date,
  staleTime: number = 60 * 1000,
  initialValue?: {data: CategoryListItem[]; last: number},
) {
  const defaultItems: CategoryListItem[] = [4, 3, 2, 1].map(i => ({
    id: i,
    name: '',
    status: CategoryStatus.Active,
    created_at: ' ',
  }))
  initialValue = initialValue ?? {data: defaultItems, last: 1}
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
