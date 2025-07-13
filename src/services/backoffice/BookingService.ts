import dayjs from 'dayjs'

import {BookingStatus} from '@enums/StatusEnums'
import {
  BookingForm,
  BookingList,
  BookingListItem,
  BookingUpdateProps,
} from '@models/backoffice/BookingTypes'
import supabase from '@services/SupabaseClient'

class BookingService {
  private tableName = 'booking'

  public async getList(
    search?: string,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'id',
    orderBy: 'ASC' | 'DESC' = 'DESC',
    status?: BookingStatus,
    startCreatedAt?: Date,
    stopCreatedAt?: Date,
  ): Promise<BookingList> {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(this.tableName + '_view')
      .select(
        `
        id,
        user_id,
        booking_date,
        booking_time,
        status,
        created_at,
        customer_courses (
          course_id
        )
      `,
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
      const createdAt = dayjs(item.created_at).format('DD-MM-YYYY HH:mm')
      const bookingDate = dayjs(item.booking_date).format('DD-MM-YYYY')
      const bookingTime = `${item.booking_time.start} - ${item.booking_time.end}`
      const courseId = (item.customer_courses as any).course_id

      return {
        id: item.id,
        user_id: item.user_id,
        course_id: courseId,
        booking_date: bookingDate,
        booking_time: bookingTime,
        status: item.status,
        created_at: createdAt,
      }
    })

    return {
      data: transformData as BookingListItem[],
      last: count ? Math.ceil(count / perPage) : 1,
    }
  }

  public async getById(id: number): Promise<BookingForm> {
    const {data, error} = await supabase
      .from(this.tableName)
      .select(
        `
        id,
        user_id,
        booking_date,
        booking_time,
        status,
        created_at,
        customer_courses (
          course_id
        )
      `,
      )
      .eq('id', id)
      .single()
    if (error) throw error

    return {
      ...data,
      course_id: (data.customer_courses as any).course_id,
      booking_date: dayjs(data.booking_date).format('DD-MM-YYYY'),
      time_range: data.booking_time,
    } as BookingForm
  }

  public async update(booking: BookingUpdateProps): Promise<null> {
    const updateParams = {
      booking_date: dayjs(booking.booking_date, 'DD-MM-YYYY').format(
        'YYYY-MM-DD',
      ),
      booking_time: booking.booking_time,
      status: booking.status,
    }
    const {error} = await supabase
      .from(this.tableName)
      .update(updateParams)
      .eq('id', booking.id)

    if (error) throw error
    return null
  }

  public async delete(id: number): Promise<null> {
    const {error} = await supabase.from(this.tableName).delete().eq('id', id)
    if (error) throw error
    return null
  }
}

export default new BookingService()
