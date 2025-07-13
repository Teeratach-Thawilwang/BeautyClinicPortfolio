import {generateSlots} from '@functions/_shared/booking.ts'
import {supabase} from '@functions/_shared/supabase.ts'
import {errorResponse, jsonResponse} from '@functions/_shared/utils.ts'
// @ts-ignore: no type declarations
import timezone from 'https://esm.sh/dayjs@1.11.10/plugin/timezone?bundle'
// @ts-ignore: no type declarations
import utc from 'https://esm.sh/dayjs@1.11.10/plugin/utc?bundle'
// @ts-ignore: no type declarations
import dayjs from 'https://esm.sh/dayjs@1.11.10?bundle'
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

dayjs.extend(utc)
dayjs.extend(timezone)

Deno.serve(async (req: Request): Promise<Response> => {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse('Unauthorized', 401)
  }

  try {
    const accessToken = authHeader.replace('Bearer ', '')
    const {error: userError} = await supabase.service.auth.getUser(accessToken)
    if (userError) throw userError

    const {customerCourseId, date: dateString, tz} = await req.json()

    const date = dayjs.tz(dateString, tz)
    const dayOfWeek: string = date.format('dddd')

    const customerCourse = await getCustomerCourse(customerCourseId)
    const course = customerCourse.courses
    const bookings = await getBookingByDate(dateString)
    const blackoutPeriod = await getBlackoutPeriod(dateString)
    const workingTime = course[`working_time_${dayOfWeek.toLocaleLowerCase()}`]

    const availableSlots = generateSlots(
      course.duration_per_round,
      workingTime,
      bookings,
      blackoutPeriod,
      course.booking_limit_per_round,
    )

    return jsonResponse(availableSlots)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(error.message, 500)
    }
    return errorResponse('Unknown error', 500)
  }
})

async function getCustomerCourse(id: number) {
  const {data, error} = await supabase.service
    .from('customer_courses')
    .select(
      `
      id,
      courses (
        *
      )
      `,
    )
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

async function getBookingByDate(dateString: number) {
  const {data, error} = await supabase.service
    .from('booking')
    .select('*')
    .eq('booking_date', dateString)
  if (error) throw error
  return data.map((item: any) => item.booking_time)
}

async function getBlackoutPeriod(dateString: number) {
  const {data, error} = await supabase.service
    .from('blackout_period')
    .select('*')
    .eq('date', dateString)
  if (error) throw error
  return data.map((item: any) => item.time_range)
}
