import { apiClient } from '../client'
import type { Product } from './types'

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>('/api/dummyjson/products')
  return data
}

export async function fetchProduct(id: number): Promise<Product> {
  const { data } = await apiClient.get<Product>(`/api/dummyjson/products/${id}`)
  return data
}
