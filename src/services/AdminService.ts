import {shallowEqual} from 'react-redux'

import {AdminSliceInterface} from '@models/AdminInterface'
import supabase from '@repositories/supabase/SupabaseClient'
import {store, useAppSelector} from '@store/Store'
import {update} from '@store/slices/AdminSlice'

type Response<T> = {
  success: boolean | null
  data: T | null
  error: string | null
}

class AdminService {
  public update(data: Partial<AdminSliceInterface>) {
    store.dispatch(update(data))
  }

  public getIsAdmin() {
    return useAppSelector(state => state.admin.isAdmin, shallowEqual)
  }

  public getIsLoading() {
    return useAppSelector(state => state.admin.isLoading, shallowEqual)
  }

  public getError() {
    return useAppSelector(state => state.admin.error, shallowEqual)
  }

  public async fetchIsAdmin(
    userId: string,
  ): Promise<Response<{user_id: string}>> {
    this.update({isLoading: true})
    const {data, error} = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', userId)
      .limit(1)

    if (error) {
      this.update({isAdmin: false, isLoading: false, error: error.message})
      return {success: false, data: null, error: error.message}
    }

    if (data.length != 0) {
      this.update({isAdmin: true, isLoading: false, error: null})
      return {success: true, data: data[0], error: null}
    }

    this.update({isAdmin: false, isLoading: false, error: null})
    return {success: true, data: null, error: null}
  }
}

export default new AdminService()
