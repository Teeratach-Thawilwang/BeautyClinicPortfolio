import {supabase} from '@functions/_shared/supabase.ts'
import {errorResponse, jsonResponse} from '@functions/_shared/utils.ts'
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

Deno.serve(async (_req: Request): Promise<Response> => {
  const {data: banners, error: bannerError} = await supabase.service
    .from('banners')
    .select('id, image')
    .order('id', {ascending: true})

  if (bannerError) {
    return errorResponse(bannerError.message, 404)
  }

  const {data: categories, error: categoryError} = await supabase.service
    .from('categories')
    .select('id, name, images, status')
    .eq('status', 'active')
    .order('id', {ascending: true})

  if (categoryError) {
    return errorResponse(categoryError.message, 404)
  }
  const transformCategories = categories.map((category: any) => {
    return {
      id: category.id,
      name: category.name,
      images: category.images,
    }
  })

  const {data: courses, error: courseError} = await supabase.service
    .from('courses')
    .select(
      `
      id,
      status,
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
        name,
        status
      )
      `,
    )
    .eq('status', 'active')
    .order('id', {ascending: true})

  if (courseError) {
    return errorResponse(courseError.message, 404)
  }

  const coursesFiltered = courses.filter(
    (course: any) => course.categories && course.categories.status === 'active',
  )

  const coursesGroupByCategoryObj = coursesFiltered.reduce(
    (acc: any[], course: any) => {
      const categoryId = course.categories.id
      if (!acc[categoryId]) {
        acc[categoryId] = {
          categoryId,
          categoryName: course.categories.name,
          courses: [],
        }
      }

      const {status, categories, ...transformCourse} = course
      acc[categoryId].courses.push(transformCourse)
      return acc
    },
    {},
  )
  const coursesGroupByCategory = Object.values(coursesGroupByCategoryObj)

  return jsonResponse([
    {type: 'banner', items: banners},
    {type: 'category', items: transformCategories},
    {type: 'course', items: coursesGroupByCategory},
  ])
})
