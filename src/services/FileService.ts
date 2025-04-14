import RNFS from 'react-native-fs'
import {toByteArray} from 'react-native-quick-base64'

import {ImageFileAsset} from '@models/ImagePickerTypes'
import {FileObject} from '@models/SupabaseInterface'
import supabase from '@services/SupabaseClient'
import {getPlatFormOS} from '@utils/Helpers'

class FileService {
  public async getList(
    search?: string,
    page?: number,
    perPage?: number,
    sortBy?: {column?: string; order?: string},
    folder: string = 'public',
    bucket?: string,
  ): Promise<FileObject[] | null> {
    const bucketName = bucket ?? process.env.SUPABASE_MEDIA_BUCKET!
    const offset = page && perPage ? (page - 1) * perPage : 0

    const {data, error} = await supabase.storage.from(bucketName).list(folder, {
      limit: perPage ?? 15,
      offset: offset,
      sortBy: sortBy ?? {column: 'name', order: 'desc'},
      search: search,
    })

    if (error) throw error
    return data
  }

  public async uploadImage(
    fileAsset: ImageFileAsset,
    folder: string = 'public',
    bucket?: string,
    upsert?: boolean,
  ): Promise<string> {
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

    if (error) throw error

    const object = supabase.storage.from(bucketName).getPublicUrl(data.path)
    return object.data.publicUrl
  }

  public async delete(filePath: string, bucket?: string): Promise<null> {
    const bucketName = bucket ?? process.env.SUPABASE_MEDIA_BUCKET!
    const {error} = await supabase.storage.from(bucketName).remove([filePath])

    if (error) throw error
    return null
  }
}

export default new FileService()
