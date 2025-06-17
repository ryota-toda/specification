import { toPng } from 'html-to-image'

export const useImageDataUrl = () => {
  const imageNode = window.document.getElementById('image-container')

  const exportImageDataUrl = async () => {
    if (!imageNode) return
    const dataUrl = await toPng(imageNode)
    return dataUrl
  }

  return exportImageDataUrl
}
