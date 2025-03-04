import supabase from '@repositories/supabase/SupabaseClient'
import {getFCMToken} from '@utils/FirebaseMessage'

async function upsertFcmToken(userId: string) {
  const fcmToken = await getFCMToken()
  await supabase
    .from('user_fcm_tokens')
    .upsert(
      {user_id: userId, token: fcmToken, updated_at: new Date()},
      {onConflict: 'token'},
    )
}

export function supabaseFcmListener() {
  return supabase.auth.onAuthStateChange((event, session) => {
    setTimeout(async () => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user) {
        await upsertFcmToken(session.user.id)
      }
    }, 0)
  })
}
