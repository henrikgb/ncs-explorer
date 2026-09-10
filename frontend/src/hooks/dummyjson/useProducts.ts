import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchProducts } from '../../api/dummyjson/products'

export function useProducts() {
  return useQuery({
    queryKey: ['dummyjson', 'products'],
    queryFn: fetchProducts,
    enabled: false,
  })
}

export function useClearProducts() {
  const clearProducts = useQueryClient()
  return () => clearProducts.setQueryData(['dummyjson', 'products'], [])
}