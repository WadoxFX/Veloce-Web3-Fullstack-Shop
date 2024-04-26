import { getProducts } from '@/api/products'
import { useEffect, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'

export const usePagination = (limit: number, filters: FiltersList) => {
  const [data, setData] = useState<Products>([])
  const [page, setPage] = useState<number>(1)
  const { inView, ref } = useInView({ threshold: 0 })

  useEffect(() => {
    setPage(1)
    setData([])
  }, [filters])

  const fetchProducts = useCallback(async () => {
    const products = await getProducts({ config: { params: { limit, page, filters } } }).then(
      data => data.data,
    )
    setData(prev => [...prev, ...products])
    setPage(page + 1)
  }, [limit, page, filters])

  useEffect(() => {
    if (inView) {
      fetchProducts()
    }
  }, [inView, fetchProducts])

  return { data, ref }
}
