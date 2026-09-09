import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '../../api/dummyjson/products'

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['dummyjson', 'product', id],
    queryFn: () => fetchProduct(id),
    enabled: Number.isFinite(id),
  })
}