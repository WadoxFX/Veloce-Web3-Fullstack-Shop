import { getProducts } from '@/api/products'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const usePagination = (limit: number) => {
  const [data, setData] = useState<Products>([])
  const [page, setPage] = useState<number>(1)
  const { inView, ref } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView) {
      const ferchProducts = async () => {
        const products = await getProducts().then(data => data.data)

        setData(prev => [...prev, ...products])
        setPage(prev => prev + 1)
      }

      ferchProducts()
    }
  }, [inView])

  return { data, ref }
}
