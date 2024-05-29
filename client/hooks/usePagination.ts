import { api } from '@/api/instance'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const usePagination = <T extends unknown[]>(url: string, limit: number, options?: FiltersList) => {
  const [data, setData] = useState<T>([] as unknown as T)
  const [page, setPage] = useState<number>(1)
  const [blocker, setBlocker] = useState<boolean>(false)
  const { inView, ref } = useInView({ threshold: 0 })

  useEffect(() => {
    setPage(1)
    setData([] as unknown as T)
    setBlocker(false)
  }, [options])

  const getData = useCallback(async () => {
    const data = await api.get<T>(url, { params: { limit, page, options } }).then(res => res.data)

    setData(prev => [...prev, ...data] as T)
    setPage(page + 1)

    if (!data.length) setBlocker(true)
  }, [limit, page, options])

  useEffect(() => {
    if (inView && !blocker) getData()
  }, [inView, getData])

  return { data, blocker, ref }
}
