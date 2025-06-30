import {
  SearchCourseItem,
  SearchCourseList,
} from '@models/store/SearchCourseTypes'
import supabase from '@services/SupabaseClient'

class SearchCourseService {
  tableName = 'courses'

  public async getList(
    search?: string,
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'id',
    orderBy: 'ASC' | 'DESC' = 'DESC',
  ): Promise<SearchCourseList> {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(this.tableName)
      .select(
        `
        id,
        name,
        description,
        price,
        images,
        treatment_rounds,
        duration_per_round,
        working_time_monday,
        working_time_tuesday,
        working_time_wednesday,
        working_time_thursday,
        working_time_friday,
        working_time_saturday,
        working_time_sunday,
        categories (
            id,
            name
        )
        `,
        {count: 'exact'},
      )
      .eq('status', 'active')
      .order(sortBy, {ascending: orderBy == 'ASC'})

    query = query.eq('status', 'active')

    if (search) {
      query = query.or(`name.ilike.%${search}%`)
    }
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    } else {
      const categoryIds = await this.getActiveCategoryIds()
      query = query.in('category_id', categoryIds)
    }
    if (minPrice) {
      query = query.gte('price', minPrice)
    }
    if (maxPrice) {
      query = query.lte('price', maxPrice)
    }

    const {data, error, count} = await query.range(from, to)
    if (error) throw error

    const transformData = data.map(course => {
      const {categories, ...rest} = course
      return {
        ...rest,
        category: categories,
      }
    })
    return {
      data: transformData as unknown as SearchCourseItem[],
      last: count ? Math.ceil(count / perPage) : 1,
      total: count ?? 0,
    }
  }

  public async getActiveCategoryIds() {
    const {data, error} = await supabase
      .from('categories')
      .select('id')
      .eq('status', 'active')

    if (error) throw error

    return data?.map(category => category.id)
  }
}

export default new SearchCourseService()
