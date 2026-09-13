import { useQuery } from '@tanstack/react-query'
import { fetchFields } from '../../api/sodir/fields'

export function useFields() {
  return useQuery({
    queryKey: ['sodir', 'fields'],
    queryFn: fetchFields,
  })
}
