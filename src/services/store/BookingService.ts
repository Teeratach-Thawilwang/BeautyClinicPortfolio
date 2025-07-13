import dayjs from 'dayjs'

import {TimeRange} from '@components/TimeRangePicker/types'
import {BookingStatus, CustomerCourseStatus} from '@enums/StatusEnums'
import {
  BookingList,
  CreateBookingProps,
  UpdateBookingProps,
} from '@models/store/BookingTypes'
import supabase from '@services/SupabaseClient'

class BookingService {
  tableName = 'booking'

  public async getList(
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'booking_date',
    orderBy: 'ASC' | 'DESC' = 'DESC',
  ): Promise<BookingList> {
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
        booking_date,
        booking_time,
        customer_courses (
          id,
          courses(
            id,
            name,
            images,
            appointment_editable_before
          )
        )
        `,
        {count: 'exact'},
      )
      .eq('user_id', user.id)
      .eq('status', BookingStatus.Incoming)
      .order(sortBy, {ascending: orderBy == 'ASC'})

    const {data, error, count} = await query.range(from, to)
    if (error) throw error

    const transformData = data.map(item => {
      const bookingDate = dayjs(item.booking_date).format('DD-MM-YYYY')
      const course = (item.customer_courses as any).courses as any
      return {
        id: item.id,
        customer_course_id: (item.customer_courses as any).id,
        name: course.name,
        images: course.images,
        appointment_editable_before: course.appointment_editable_before,
        booking_date: bookingDate,
        booking_time: item.booking_time,
      }
    })

    return {
      data: transformData,
      last: count ? Math.ceil(count / perPage) : 1,
      total: count ?? 0,
    }
  }

  public async create(params: CreateBookingProps): Promise<null> {
    const sessionResponse = await supabase.auth.getSession()
    const user = sessionResponse.data.session?.user
    const accessToken = sessionResponse.data.session?.access_token
    if (!accessToken || !user) {
      throw new Error('Only authenticated user has permission.')
    }

    const insertParams = {
      user_id: user.id,
      customer_course_id: params.customer_course_id,
      booking_date: dayjs(params.booking_date, 'DD-MM-YYYY').format(
        'YYYY-MM-DD',
      ),
      booking_time: params.booking_time,
    }
    const {error: bookingError} = await supabase
      .from(this.tableName)
      .insert(insertParams)
    if (bookingError) throw bookingError

    const {data: customerCourse, error: CustomerCourseError} = await supabase
      .from('customer_courses')
      .select(
        `
        id,
        quota_round,
        used_round
        `,
      )
      .eq('id', params.customer_course_id)
      .single()
    if (CustomerCourseError) throw CustomerCourseError

    const newUsedRound = customerCourse.used_round + 1
    const status =
      customerCourse.quota_round > newUsedRound
        ? CustomerCourseStatus.Active
        : CustomerCourseStatus.Completed
    const updateParams = {
      used_round: newUsedRound,
      status: status,
    }
    const {error: UpdateCustomerCourseError} = await supabase
      .from('customer_courses')
      .update(updateParams)
      .eq('id', params.customer_course_id)
    if (UpdateCustomerCourseError) throw UpdateCustomerCourseError

    return null
  }

  public async update(params: UpdateBookingProps): Promise<null> {
    const updateParams = {
      booking_date: dayjs(params.booking_date, 'DD-MM-YYYY').format(
        'YYYY-MM-DD',
      ),
      booking_time: params.booking_time,
    }
    const {error} = await supabase
      .from(this.tableName)
      .update(updateParams)
      .eq('id', params.id)

    if (error) throw error
    return null
  }

  // delete booking
  // minus used_round on customer_courses
  public async delete(id: number): Promise<null> {
    const {data: booking, error: bookingError} = await supabase
      .from(this.tableName)
      .select(
        `
        id,
        customer_course_id
        `,
      )
      .eq('id', id)
      .single()
    if (bookingError) throw bookingError

    const {error: deleteError} = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)
    if (deleteError) throw deleteError

    const {data: customerCourse, error: CustomerCourseError} = await supabase
      .from('customer_courses')
      .select(
        `
        id,
        quota_round,
        used_round
        `,
      )
      .eq('id', booking.customer_course_id)
      .single()
    if (CustomerCourseError) throw CustomerCourseError

    const {error: UpdateCustomerCourseError} = await supabase
      .from('customer_courses')
      .update({
        used_round: customerCourse.used_round - 1,
      })
      .eq('id', booking.customer_course_id)
    if (UpdateCustomerCourseError) throw UpdateCustomerCourseError

    return null
  }

  public async getBookingTimeAvailable(
    customerCourseId: number,
    date: string,
  ): Promise<TimeRange[]> {
    const sessionResponse = await supabase.auth.getSession()
    const accessToken = sessionResponse.data.session?.access_token
    if (!accessToken) {
      throw new Error('Only authenticated user has permission.')
    }
    const payload = {
      customerCourseId: customerCourseId,
      date: dayjs(date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      tz: process.env.tz,
    }
    const response = await fetch(
      process.env.SUPABASE_URL + '/functions/v1/get-booking-time-available',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    )

    const result = await response.json()
    if (!response.ok) {
      throw result
    }
    return result as TimeRange[]
  }
}

export default new BookingService()
