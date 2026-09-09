import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../api/dummyjson/products'

export function useProducts() {
  return useQuery({
    queryKey: ['dummyjson', 'products'],
    queryFn: fetchProducts,
  })
}