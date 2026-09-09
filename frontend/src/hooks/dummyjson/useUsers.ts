import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../../api/dummyjson/users'

export function useUsers() {
  return useQuery({
    queryKey: ['dummyjson', 'users'],
    queryFn: fetchUsers,
  })
}