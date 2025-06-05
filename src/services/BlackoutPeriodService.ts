import dayjs from 'dayjs'

import {BlackoutPeriodStatus} from '@enums/StatusEnums'
import {
  BlackoutPeriod,
  BlackoutPeriodCreateProps,
  BlackoutPeriodItem,
  BlackoutPeriodList,
  BlackoutPeriodUpdateProps,
} from '@models/BlackoutPeriod'
import supabase from '@services/SupabaseClient'

class BlackoutPeriodService {
  private tableName = 'blackout_period'

  public async getList(
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'date',
    orderBy: 'ASC' | 'DESC' = 'DESC',
    isActive?: boolean,
    startCreatedAt?: Date,
    stopCreatedAt?: Date,
  ): Promise<BlackoutPeriodList> {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(this.tableName)
      .select('id, date, time_range, created_at', {count: 'exact'})
      .order(sortBy, {ascending: orderBy == 'ASC'})

    if (isActive) {
      // Note: Don't forget to create index for date field
      query = query.gte('date', dayjs().format('YYYY-MM-DD'))
    }

    if (startCreatedAt) {
      query = query.gte('created_at', new Date(startCreatedAt).toISOString())
    }
    if (stopCreatedAt) {
      query = query.lte('created_at', new Date(stopCreatedAt).toISOString())
    }

    const {data, error, count} = await query.range(from, to)
    if (error) throw error

    // const currentDate = dayjs()
    const transformData = data.map(item => {
      const date = dayjs(item.date, 'YYYY-MM-DD')
      const createdAt = dayjs(item.created_at).format('DD/MM/YYYY HH:mm')
      return {
        id: item.id,
        date: date.format('DD/MM/YYYY'),
        time_range: `${item.time_range.start} - ${item.time_range.end}`,
        status: date.isBefore()
          ? BlackoutPeriodStatus.Expired
          : BlackoutPeriodStatus.Active,
        created_at: createdAt,
      }
    })

    return {
      data: transformData as BlackoutPeriodItem[],
      last: count ? Math.ceil(count / perPage) : 1,
    }
  }

  public async getById(id: number): Promise<BlackoutPeriod> {
    const {data, error} = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    return {
      ...data,
      date: dayjs(data.date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
    } as BlackoutPeriod
  }

  public async create(
    blackoutPeriod: BlackoutPeriodCreateProps,
  ): Promise<null> {
    const transformData = {
      ...blackoutPeriod,
      date: dayjs(blackoutPeriod.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    }
    const {error} = await supabase.from(this.tableName).insert(transformData)

    if (error) throw error
    return null
  }

  public async update(
    blackoutPeriod: BlackoutPeriodUpdateProps,
  ): Promise<null> {
    const transformData = {
      date: dayjs(blackoutPeriod.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      time_range: blackoutPeriod.time_range,
    }
    const {error} = await supabase
      .from(this.tableName)
      .update(transformData)
      .eq('id', blackoutPeriod.id)

    if (error) throw error
    return null
  }

  public async delete(id: number): Promise<null> {
    const {error} = await supabase.from(this.tableName).delete().eq('id', id)
    if (error) throw error
    return null
  }
}

export default new BlackoutPeriodService()
