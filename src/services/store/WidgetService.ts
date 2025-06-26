import {Widget} from '@models/store/WidgetTypes'
import supabase from '@services/SupabaseClient'

class WidgetService {
  public async getList(): Promise<Widget[]> {
    const {data, error} = await supabase.functions.invoke('get-widgets', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error) throw error

    return data
  }
}

export default new WidgetService()
