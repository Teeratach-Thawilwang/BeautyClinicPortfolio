import supabase from '@repositories/supabase/SupabaseClient'
import AdminService from '@services/AdminService'
import AuthenticationService from '@services/AuthenticationService'

export function supabaseListeners() {
  return supabase.auth.onAuthStateChange((event, session) => {
    setTimeout(async () => {
      if (
        (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') &&
        session?.user
      ) {
        await AuthenticationService.upsertFcmToken(session.user.id)
        await AdminService.fetchIsAdmin(session.user.id)
      }

      if (event === 'SIGNED_OUT') {
        AdminService.update({isAdmin: false})
      }
    }, 0)
  })
}
