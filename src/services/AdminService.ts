import dayjs from 'dayjs'

import {Admin, AdminList} from '@models/AdminTypes'
import supabase from '@services/SupabaseClient'

class AdminService {
  private tableName = 'admins'

  public async getList(
    search?: string,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'created_at',
    orderBy: 'ASC' | 'DESC' = 'DESC',
    startCreatedAt?: Date,
    stopCreatedAt?: Date,
  ): Promise<AdminList> {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from('admins_view')
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
      data: transformData as Admin[],
      last: count ? Math.ceil(count / perPage) : 1,
    }
  }

  public async create(email: string): Promise<null> {
    const sessionResponse = await supabase.auth.getSession()
    const accessToken = sessionResponse.data.session?.access_token
    if (!accessToken) {
      throw new Error('Only authenticated user has permission.')
    }
    const response = await fetch(
      process.env.SUPABASE_URL + '/functions/v1/create-admin-by-email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({email}),
      },
    )

    if (!response.ok) {
      const error = await response.json()
      throw error
    }

    return null
  }

  public async delete(uuid: string): Promise<null> {
    const {error} = await supabase
      .from(this.tableName)
      .delete()
      .eq('user_id', uuid)
    if (error) throw error
    return null
  }
}

export default new AdminService()
