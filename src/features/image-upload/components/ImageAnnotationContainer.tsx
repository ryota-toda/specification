'use client'

import { useRef, useState } from 'react'
import clsx from 'clsx'
import { ImageSelector } from './ImageSelector'
import { ImageAnnotation } from './ImageAnnotation'

type ImageAnnotatorContainerProps = {
  width?: string
  height?: string
  className?: string
}

export const ImageAnnotatorContainer = ({
  width = 'w-[600px]',
  height = 'h-[400px]',
  className,
}: ImageAnnotatorContainerProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const handleAddImage = (url: string) => setImageUrl(url)
  const imgRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={imgRef}
      id="customImg"
      className={clsx(
        'flex items-center justify-center',
        'rounded border-2 border border-gray-300 dark:border-gray-700',
        imageUrl ? 'w-fit' : width,
        imageUrl ? 'h-fit' : height,
        className,
      )}
    >
      {!imageUrl ? <ImageSelector onImageSelect={handleAddImage} /> : <ImageAnnotation imageUrl={imageUrl} />}
    </div>
  )
}

export default ImageAnnotatorContainer
