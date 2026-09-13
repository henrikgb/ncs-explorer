import { apiClient } from '../client'
import type { Field } from './types'

export async function fetchFields(): Promise<Field[]> {
  const { data } = await apiClient.get<Field[]>('/api/sodir/fields')
  return data
}
