import { isAxiosError } from 'axios'
import './App.css'
import { useClearProducts, useProducts } from './hooks/dummyjson/useProducts'
import { Button } from './components/Button'

function App() {
  const { 
    data: products, 
    isLoading, 
    isError, 
    error,
    refetch: refetchingProducts,
    isFetching: isFetchingProducts,
  } = useProducts()
  const clearProducts = useClearProducts()

  return (
    <>
      <section id="center">
        <div>
          <h1>NCS Explorer</h1>
          <h4>Explore oil and gas data from the Norwegian Continental Shelf</h4>
        </div>
        
        <div className="flex flex-row gap-10">
          <Button 
            onClick={() => refetchingProducts()}
            disabled={isFetchingProducts}
          >
            {isFetchingProducts ? 'Loading Products...' : 'Load Products'}
          </Button>
          <Button
            onClick={() => {
              clearProducts()
            }}
          >
            Clear product list
          </Button>
        </div>

        {isLoading && <p>Loading products...</p>}
        {isError && (
          <p role="alert">
            Failed to load products:{' '}
            {isAxiosError<{ error: string }>(error)
              ? error.response?.data?.error ?? error.message
              : 'Unknown error'}
          </p>
        )}
        {products && (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} — ${product.price} - {product.category}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default App
