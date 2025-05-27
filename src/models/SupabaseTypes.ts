export type Bucket = {
  id: string
  name: string
  owner: string
  file_size_limit?: number
  allowed_mime_types?: string[]
  created_at: string
  updated_at: string
  public: boolean
}

export type FileObject = {
  name: string
  bucket_id: string
  owner: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: Record<string, any>
  buckets: Bucket
}
