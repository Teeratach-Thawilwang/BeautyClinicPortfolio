import dayjs from 'dayjs'

import {CategoryStatus} from '@enums/StatusEnums'
import {
  Category,
  CategoryCreateProps,
  CategoryList,
  CategoryListItem,
  CategoryUpdateProps,
} from '@models/CategoryTypes'
import supabase from '@services/SupabaseClient'

class CategoryService {
  private tableName = 'categories'

  public async getList(
    search?: string,
    page: number = 1,
    perPage: number = 15,
    sortBy: string = 'id',
    orderBy: 'ASC' | 'DESC' = 'DESC',
    status?: CategoryStatus,
    startCreatedAt?: Date,
    stopCreatedAt?: Date,
  ): Promise<CategoryList> {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase
      .from(this.tableName)
      .select('id, name, status, created_at', {count: 'exact'})
      .order(sortBy, {ascending: orderBy == 'ASC'})

    if (search) {
      if (isNaN(Number(search))) {
        query = query.or(`name.ilike.%${search}%`)
      } else {
        query = query.or(`id.eq.${search}`)
      }
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
      const createdAt = dayjs(item.created_at).format('DD/MM/YYYY HH:mm')
      return {...item, created_at: createdAt}
    })

    return {
      data: transformData as CategoryListItem[],
      last: count ? Math.ceil(count / perPage) : 1,
    }
  }

  public async getAllActive(): Promise<Category[]> {
    const {data, error} = await supabase
      .from(this.tableName)
      .select('id, name, status, created_at')
      .eq('status', 'active')

    if (error) throw error
    return data as Category[]
  }

  public async getById(id: number): Promise<Category> {
    const {data, error} = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Category
  }

  public async create(category: CategoryCreateProps): Promise<null> {
    const {error} = await supabase.from(this.tableName).insert(category)

    if (error) throw error
    return null
  }

  public async update(category: CategoryUpdateProps): Promise<null> {
    const {id, ...updateParams} = {...category}
    const {error} = await supabase
      .from(this.tableName)
      .update(updateParams)
      .eq('id', id)

    if (error) throw error
    return null
  }

  public async delete(id: number): Promise<null> {
    const {error} = await supabase.from(this.tableName).delete().eq('id', id)
    if (error) throw error
    return null
  }
}

export default new CategoryService()
