import { useEffect, useState } from 'react'

export const useLocalStorage = (key: string) => {
  const [data, setData] = useState<BasketProducts>([])

  useEffect(() => {
    const localData = localStorage.getItem(key)

    if (localData) {
      const loaderData = JSON.parse(localData)
      setData(loaderData)
    }
  }, [key])

  const onClear = (id: number) => {
    const newData = data.filter((_, index) => index !== id)
    setData(newData)
    localStorage.setItem(key, JSON.stringify(newData))
  }

  return { data, onClear }
}
