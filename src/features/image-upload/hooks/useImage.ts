import { ChangeEvent, useCallback, useState } from 'react'

interface UseImageReturn {
  imageUrl?: string
  addImage: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useImage = (): UseImageReturn => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)

  const addImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const url = reader.result as string
        setImageUrl(url)
      }

      reader.readAsDataURL(file)
    }
  }, [])

  return { imageUrl, addImage }
}
