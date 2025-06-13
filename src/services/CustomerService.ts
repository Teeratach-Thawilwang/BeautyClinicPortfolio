import dayjs from 'dayjs'

import {Customer, CustomerList} from '@models/CustomerType'
import supabase from '@services/SupabaseClient'

class CustomerService {
  private tableName = 'customers'

  public async getList(
    search?: string,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'created_at',
    orderBy: 'ASC' | 'DESC' = 'DESC',
    startCreatedAt?: Date,
    stopCreatedAt?: Date,
  ): Promise<CustomerList> {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(`${this.tableName}_view`)
      .select('*', {count: 'exact'})
      .order(sortBy, {ascending: orderBy == 'ASC'})

    if (search) {
      const orConditions: string[] = []
      if (isNaN(Number(search))) {
        orConditions.push(`id.ilike.%${search}%`)
        orConditions.push(`email.ilike.%${search}%`)
      }
      query = query.or(orConditions.join(','))
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
      return {...item, created_at: createdAt}
    })

    return {
      data: transformData as Customer[],
      last: count ? Math.ceil(count / perPage) : 1,
    }
  }

  public async getById(id: number): Promise<Customer> {
    const {data, error} = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Customer
  }
}

export default new CustomerService()
