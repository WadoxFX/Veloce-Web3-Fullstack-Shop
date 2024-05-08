import { getProducts } from '@/api/products'
import { useEffect, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'

export const usePagination = (limit: number, filters: FiltersList) => {
  const [data, setData] = useState<Products>([])
  const [page, setPage] = useState<number>(1)
  const [blocker, setBlocker] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { inView, ref } = useInView({ threshold: 0 })

  useEffect(() => {
    setPage(1)
    setData([])
    setBlocker(false)
  }, [filters])

  const fetchProducts = useCallback(async () => {
    const products = await getProducts({ config: { params: { limit, page, filters } } }).then(
      data => data.data,
    )
    setData(prev => [...prev, ...products])
    setIsLoading(false)
    setPage(page + 1)
    if (!products.length) setBlocker(true)
  }, [limit, page, filters])

  useEffect(() => {
    if (inView && !blocker) {
      fetchProducts()
    }
  }, [inView, fetchProducts])

  return { data, isLoading, blocker, ref }
}
