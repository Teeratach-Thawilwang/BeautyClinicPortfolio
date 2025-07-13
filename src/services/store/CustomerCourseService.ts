import dayjs from 'dayjs'

import {CustomerCourseStatus} from '@enums/StatusEnums'
import {CustomerCourseList} from '@models/store/CustomerCourseTypes'
import supabase from '@services/SupabaseClient'

class CustomerCourseService {
  tableName = 'customer_courses'

  public async getList(
    status?: CustomerCourseStatus,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'created_at',
    orderBy: 'ASC' | 'DESC' = 'DESC',
  ): Promise<CustomerCourseList> {
    const sessionResponse = await supabase.auth.getSession()
    const user = sessionResponse.data.session?.user
    if (!user) {
      return {
        data: [],
        last: 1,
        total: 0,
      }
    }

    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(this.tableName)
      .select(
        `
        id,
        quota_round,
        used_round,
        created_at,
        courses(
          id,
          name,
          images,
          price,
          duration_per_round
        )
        `,
        {count: 'exact'},
      )
      .eq('user_id', user.id)
      .order(sortBy, {ascending: orderBy == 'ASC'})

    if (status) {
      query = query.eq('status', status)
    }

    const {data, error, count} = await query.range(from, to)
    if (error) throw error

    const transformData = data.map(item => {
      const createdAt = dayjs(item.created_at).format('DD/MM/YYYY HH:mm')
      return {
        id: item.id,
        name: (item.courses as any).name,
        images: (item.courses as any).images,
        price: (item.courses as any).price,
        duration_per_round: (item.courses as any).duration_per_round,
        quota_round: item.quota_round,
        used_round: item.used_round,
        created_at: createdAt,
      }
    })

    return {
      data: transformData,
      last: count ? Math.ceil(count / perPage) : 1,
      total: count ?? 0,
    }
  }
}

export default new CustomerCourseService()
