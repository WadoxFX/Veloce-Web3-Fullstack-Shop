import { useState } from 'react'

export const useToggle = (init?: boolean): [boolean, () => void] => {
  const [isOn, setValue] = useState<boolean>(init || false)

  const toggle = () => setValue(prev => !prev)

  return [isOn, toggle]
}
