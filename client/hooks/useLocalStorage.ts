import { useEffect, useState } from 'react'

export const useLocalStorage = (key: string) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<BasketProducts>([])

  useEffect(() => {
    const localData = localStorage.getItem(key)

    if (localData) {
      const loaderData = JSON.parse(localData)
      setData(loaderData)
      return setLoading(false)
    }

    setLoading(false)
  }, [key])

  const clear = (id: number) => {
    const newData = data.filter((_, index) => index !== id)
    setData(newData)
    localStorage.setItem(key, JSON.stringify(newData))
  }

  return { data, loading, clear }
}
