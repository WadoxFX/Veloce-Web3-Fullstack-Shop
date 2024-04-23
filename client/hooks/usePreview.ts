import { useEffect, useState } from 'react'

export const usePreview = (files: FileList | null) => {
  const [preview, setPreview] = useState<string[]>([])

  useEffect(() => {
    if (files) {
      Array.from(files).map((file: File) => {
        const fr = new FileReader()

        fr.onload = event => {
          const result: string = event.target?.result as string
          setPreview((preview: string[]) => [...preview, result])
        }
        fr.readAsDataURL(file)
      })
    } else {
      setPreview([])
    }
  }, [files])

  return { preview }
}
