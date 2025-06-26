import {useQuery} from '@tanstack/react-query'

import WidgetService from '@services/store/WidgetService'

export function useWidgetList(
  staleTime: number = 10 * 60 * 1000,
  initialValue?: [],
) {
  const result = useQuery({
    queryKey: ['widget-list'],
    queryFn: async () => await WidgetService.getList(),
    placeholderData: previousData => previousData,
    staleTime: staleTime,
  })

  return {...result, data: result.data ?? initialValue}
}
