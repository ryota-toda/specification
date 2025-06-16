'use client'

import { FC, useRef, useState } from 'react'
import clsx from 'clsx'
import { ImageSelector } from './ImageSelector'
import { ImageAnnotation } from './ImageAnnotation'
import { Button } from '@/components/ui/button'
import { useImage } from '@/features/image-upload/hooks/useImage'

type ImageAnnotatorContainerProps = {
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
  const imgRef = useRef<HTMLDivElement>(null)
  const { exportImage } = useImage()

  return (
    <>
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
      {imageUrl && (
        <div className={clsx('flex justify-end')}>
          <Button onClick={() => exportImage(imgRef)}>export img</Button>
        </div>
      )}
    </>
  )
}

export default ImageAnnotatorContainer
