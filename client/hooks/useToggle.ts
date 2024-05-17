import { useState } from 'react'

export const useToggle = (init: boolean = false) => {
  const [isOn, setValue] = useState<boolean>(init)

  const toggle = () => setValue(prev => !prev)

  return [isOn, toggle as () => void] as const
}
