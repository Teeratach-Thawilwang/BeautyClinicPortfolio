import {getAccessToken, sendNotificationToFCM} from '@functions/_shared/fcm.ts'
import {supabase} from '@functions/_shared/supabase.ts'
import {errorResponse, jsonResponse} from '@functions/_shared/utils.ts'
// @ts-ignore: no type declarations
import customParseFormat from 'https://esm.sh/dayjs@1.11.10/plugin/customParseFormat?bundle'
// @ts-ignore: no type declarations
import timezone from 'https://esm.sh/dayjs@1.11.10/plugin/timezone?bundle'
// @ts-ignore: no type declarations
import utc from 'https://esm.sh/dayjs@1.11.10/plugin/utc?bundle'
// @ts-ignore: no type declarations
import dayjs from 'https://esm.sh/dayjs@1.11.10?bundle'
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

Deno.serve(async (_req: Request): Promise<Response> => {
  try {
    const sendBeforeMinutes = parseInt(
      Deno.env.get('NOTFICATION_BEFORE_MINUTES') ?? '60',
    )

    // ดึงวันที่ YYYY-MM-DD
    const now = dayjs().tz('Asia/Bangkok')
    const dateString = now.format('YYYY-MM-DD')

    // หา booking ที่กำลังจะมาถึงในเวลาไม่เกิน x ชั่วโมง
    const {data: dateBookings, error: bookingError} = await supabase.service
      .from('booking')
      .select(
        `
        id,
        user_id,
        booking_date,
        booking_time,
        customer_courses (
          courses (
            name
          )
        )
        `,
      )
      .eq('booking_date', dateString)
    if (bookingError) throw bookingError
    const bookings = dateBookings.filter((item: any) => {
      const [hour, minute] = item.booking_time.start.split(':').map(Number)
      const time = now
        .set('hour', hour)
        .set('minute', minute)
        .set('second', 0)
        .set('millisecond', 0)
      const diffInMinutes = time.diff(now, 'minute')
      return diffInMinutes > 0 && diffInMinutes <= sendBeforeMinutes
    })
    const userIds = bookings.map((item: any) => item.user_id)

    // ดึง fcm tokens มา
    const {data: fcmTokens, error: fcmError} = await supabase.service
      .from('user_fcm_tokens')
      .select('token, user_id')
      .in('user_id', userIds)
    if (fcmError) throw fcmError

    // fetch API ส่ง notfication
    const accessToken = await getAccessToken()
    for (const booking of bookings) {
      const userId = booking.user_id
      const courseName = booking.customer_courses?.courses?.name
      const message = `ใกล้ถึงเวลานัดหมายคอร์ส ${courseName} แล้ว`

      const tokens: string[] = Array.from(
        new Set(
          fcmTokens
            .filter((t: any) => t.user_id === userId)
            .map((t: any) => t.token),
        ),
      )

      for (const token of tokens) {
        await sendNotificationToFCM(
          accessToken,
          token,
          'แจ้งเตือนการนัดหมาย',
          message,
        )
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse(error.message, 500)
    }
    return errorResponse('Unknown error', 500)
  }
  return jsonResponse(null)
})
