import { toPng } from 'html-to-image'
import { ChangeEvent, RefObject, useCallback, useState } from 'react'

type UseImageReturn = {
  imageUrl?: string
  addImage: (e: ChangeEvent<HTMLInputElement>) => void
  exportImage: (nodeRef: RefObject<HTMLDivElement | null>) => Promise<void>
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

  const exportImage = useCallback(async (nodeRef: RefObject<HTMLDivElement | null>) => {
    if (!nodeRef) return
    const node = nodeRef.current

    if (!node) return
    const dataUrl = await toPng(node)
    const a = document.createElement('a')

    a.href = dataUrl
    a.download = `${new Date().toLocaleString()}.png`
    a.click()
    a.remove()
  }, [])

  return { imageUrl, addImage, exportImage }
}
