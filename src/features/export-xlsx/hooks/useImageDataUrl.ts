import { toPng } from 'html-to-image'

export const useImageData = () => {
  const exportImageData = async () => {
    const imageNode = window.document.getElementById('image-container')
    if (!imageNode) return

    const dataUrl = await toPng(imageNode)
    const width = imageNode.offsetWidth
    const height = imageNode.offsetHeight

    return { dataUrl, width, height }
  }

  return exportImageData
}
