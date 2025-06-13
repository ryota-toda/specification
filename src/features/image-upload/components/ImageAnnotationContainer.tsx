'use client'

import { FC, useState } from 'react'
import clsx from 'clsx'
import { ImageSelector } from './ImageSelector'
import { ImageAnnotation } from './ImageAnnotation'

interface ImageAnnotatorContainerProps {
  width?: string
  height?: string
  className?: string
}

export const ImageAnnotatorContainer: FC<ImageAnnotatorContainerProps> = ({
  width = 'w-[600px]',
  height = 'h-[400px]',
  className,
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(null)
  const handleAddImage = (url: string) => setImageUrl(url)

  return (
    <div
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
