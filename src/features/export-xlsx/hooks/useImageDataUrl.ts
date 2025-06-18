import { toPng } from 'html-to-image'

type getImageDataReturn = {
  dataUrl: string
  width: number
  height: number
}

export const getImageData = async (): Promise<getImageDataReturn | undefined> => {
  const imageNode = window.document.getElementById('image-container')
  if (!imageNode) return

  const dataUrl = await toPng(imageNode)
  const width = imageNode.offsetWidth
  const height = imageNode.offsetHeight

  return { dataUrl, width, height }
}
