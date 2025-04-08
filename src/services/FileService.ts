import RNFS from 'react-native-fs'
import {toByteArray} from 'react-native-quick-base64'

import {ImageFileAsset} from '@models/ImagePickerTypes'
import {FileObject} from '@models/SupabaseInterface'
import supabase from '@repositories/supabase/SupabaseClient'
import {getPlatFormOS} from '@utils/Helpers'

type Response<T> = {
  success: boolean | null
  data: T | null
  error: string | null
}

class FileService {
  public async getListFile(
    search?: string,
    page?: number,
    perPage?: number,
    sortBy?: {column?: string; order?: string},
    folder: string = 'public',
    bucket?: string,
  ): Promise<Response<FileObject[] | null>> {
    const bucketName = bucket ?? process.env.SUPABASE_MEDIA_BUCKET!
    const offset = page && perPage ? (page - 1) * perPage : 0

    const {data, error} = await supabase.storage.from(bucketName).list(folder, {
      limit: perPage ?? 15,
      offset: offset,
      sortBy: sortBy ?? {column: 'name', order: 'desc'},
      search: search,
    })

    if (error) {
      return {success: false, data: null, error: error.message}
    }

    return {
      success: true,
      data: data,
      error: null,
    }
  }

  public async uploadImage(
    fileAsset: ImageFileAsset,
    folder: string = 'public',
    bucket?: string,
    upsert?: boolean,
  ): Promise<Response<string>> {
    const uriPath =
      getPlatFormOS() === 'ios'
        ? fileAsset.uri.replace('file://', '')
        : fileAsset.uri
    const bucketName = bucket ?? process.env.SUPABASE_MEDIA_BUCKET!

    const extension = uriPath.split('.').pop()?.toLowerCase() || 'jpg'
    const random = Math.floor(Math.random() * 100000)
    const fileName = `${Date.now()}_${random}`
    const filePath = `${folder}/${fileName}.${extension}`

    const base64 = await RNFS.readFile(uriPath, 'base64')
    const byteArray = toByteArray(base64)

    const {data, error} = await supabase.storage
      .from(bucketName)
      .upload(filePath, byteArray, {
        contentType: fileAsset.type || 'image/jpeg',
        upsert: upsert,
      })

    if (error) {
      return {success: false, data: null, error: error.message}
    }

    const object = supabase.storage.from(bucketName).getPublicUrl(data.path)
    return {
      success: true,
      data: object.data.publicUrl,
      error: null,
    }
  }

  public async delete(filePath: string, bucket?: string) {
    const bucketName = bucket ?? process.env.SUPABASE_MEDIA_BUCKET!
    const {error} = await supabase.storage.from(bucketName).remove([filePath])

    if (error) {
      return {success: false, data: null, error: error.message}
    }

    return {
      success: true,
      data: null,
      error: null,
    }
  }
}

export default new FileService()
