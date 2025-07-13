import dayjs from 'dayjs'

import {CustomerCourseStatus} from '@enums/StatusEnums'
import {
  CourseDetail,
  CustomerCourse,
  CustomerCourseList,
  CustomerCourseUpdateProps,
} from '@models/backoffice/CustomerCourseType'
import supabase from '@services/SupabaseClient'

class CustomerCourseService {
  private tableName = 'customer_courses'

  public async getList(
    customerId: string,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'created_at',
    orderBy: 'ASC' | 'DESC' = 'DESC',
    status?: CustomerCourseStatus,
    startCreatedAt?: Date,
    stopCreatedAt?: Date,
  ): Promise<CustomerCourseList> {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(this.tableName)
      .select(
        `
        id,
        order_id,
        quota_round,
        used_round,
        status,
        updated_by,
        created_at,
        courses (
          id,
          name,
          price,
          images,
          treatment_rounds,
          duration_per_round
        )
        `,
        {count: 'exact'},
      )
      .order(sortBy, {ascending: orderBy == 'ASC'})

    const orConditions: string[] = [`user_id.eq.${customerId}`]
    query = query.or(orConditions.join(','))

    if (status) {
      query = query.eq('status', status)
    }
    if (startCreatedAt) {
      query = query.gte('created_at', new Date(startCreatedAt).toISOString())
    }
    if (stopCreatedAt) {
      query = query.lte('created_at', new Date(stopCreatedAt).toISOString())
    }

    const {data, error, count} = await query.range(from, to)
    if (error) throw error

    const transformData = data.map(item => {
      const createdAt = dayjs(item.created_at).format('DD/MM/YYYY')
      return {
        id: item.id,
        course: item.courses as unknown as CourseDetail,
        order_id: item.order_id,
        quota_round: item.quota_round,
        used_round: item.used_round,
        updated_by: item.updated_by,
        status: item.status,
        created_at: createdAt,
      }
    })

    return {
      data: transformData as CustomerCourse[],
      last: count ? Math.ceil(count / perPage) : 1,
    }
  }

  public async update(course: CustomerCourseUpdateProps): Promise<null> {
    const {id, ...updateParams} = {...course}
    const {error} = await supabase
      .from(this.tableName)
      .update(updateParams)
      .eq('id', id)
    if (error) throw error
    return null
  }
}

export default new CustomerCourseService()
