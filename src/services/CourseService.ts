import {
  CourseCreateProps,
  CourseList,
  CourseListItem,
  CourseUpdateProps,
} from '@models/CourseInterface'
import {Response} from '@models/ServiceResponseTypes'
import supabase from '@services/SupabaseClient'

class CourseService {
  private tableName = 'courses'

  public async getList(
    search?: string,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'id',
    orderBy: 'ASC' | 'DESC' = 'DESC',
  ): Promise<Response<CourseList | null>> {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(this.tableName)
      .select('id, name, status, price, created_at', {count: 'exact'})
      .order(sortBy, {ascending: orderBy == 'ASC'})

    if (search) {
      query = query.or(`id.eq.${search}, name.ilike.%${search}%`)
    }

    query = query.range(from, to)

    const {data, error, count} = await query

    if (error) {
      return {data: null, error: error.message}
    }

    const last = Math.ceil(count! / perPage)
    const paginate = {
      data: data as CourseListItem[],
      last: last,
    }

    return {
      data: paginate,
      error: null,
    }
  }

  public async create(course: CourseCreateProps): Promise<Response<null>> {
    const {error} = await supabase.from(this.tableName).insert(course)
    console.log(error)
    if (error) {
      return {data: null, error: error.message}
    }
    return {
      data: null,
      error: null,
    }
  }

  public async update(course: CourseUpdateProps): Promise<Response<null>> {
    const {id, ...updateParams} = {...course}
    const {error} = await supabase
      .from(this.tableName)
      .update(updateParams)
      .eq('id', id)
    if (error) {
      return {data: null, error: error.message}
    }
    return {
      data: null,
      error: null,
    }
  }

  public async delete(id: number): Promise<Response<null>> {
    const {error} = await supabase.from(this.tableName).delete().eq('id', id)
    if (error) {
      return {data: null, error: error.message}
    }
    return {
      data: null,
      error: null,
    }
  }
}

export default new CourseService()
