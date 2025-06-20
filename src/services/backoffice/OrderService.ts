import dayjs from 'dayjs'

import {OrderStatusEnum} from '@enums/StatusEnums'
import {
  Order,
  OrderList,
  OrderListItem,
  OrderUpdateProps,
} from '@models/backoffice/OrderTypes'
import supabase from '@services/SupabaseClient'

class OrderService {
  private tableName = 'orders'

  public async getList(
    search?: string,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'id',
    orderBy: 'ASC' | 'DESC' = 'DESC',
    status?: OrderStatusEnum,
    startCreatedAt?: Date,
    stopCreatedAt?: Date,
  ): Promise<OrderList> {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(this.tableName)
      .select(
        'id, \
        user_id, \
        course_id, \
        status, \
        net_price, \
        created_at',
        {count: 'exact'},
      )
      .order(sortBy, {ascending: orderBy == 'ASC'})

    if (search) {
      const orConditions: string[] = []
      if (isNaN(Number(search))) {
        orConditions.push(`user_id.ilike.%${search}%`)
      } else {
        orConditions.push(`id.eq.${search}`)
        orConditions.push(`course_id.eq.${search}`)
      }
      query = query.or(orConditions.join(','))
    }
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
      const createdAt = dayjs(item.created_at).format('DD/MM/YYYY HH:mm')

      return {
        ...item,
        created_at: createdAt,
      }
    })

    return {
      data: transformData as OrderListItem[],
      last: count ? Math.ceil(count / perPage) : 1,
    }
  }

  public async getById(id: number): Promise<Order> {
    const {data, error} = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return {
      ...data,
      created_at: dayjs(data.created_at).format('DD/MM/YYYY'),
    } as Order
  }

  public async update(booking: OrderUpdateProps): Promise<null> {
    const {id, ...updateParams} = {...booking}
    const {error} = await supabase
      .from(this.tableName)
      .update(updateParams)
      .eq('id', id)

    if (error) throw error
    return null
  }
}

export default new OrderService()
