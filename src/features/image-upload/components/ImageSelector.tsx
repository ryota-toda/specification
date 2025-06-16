'use client'

import clsx from 'clsx'
import { ChangeEvent, FC, useCallback, useRef } from 'react'

type ImageSelectorProps = {
  onImageSelect: (url: string) => void
}

export const ImageSelector: FC<ImageSelectorProps> = ({ onImageSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const url = reader.result as string
          onImageSelect(url)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageSelect],
  )

  return (
    <div
      className={clsx('relative border border-white border-solid', 'w-64 h-64 cursor-pointer')}
      onClick={handleClick}
    >
      <p>クリックして画像を選択</p>
      <input className="hidden" type="file" ref={inputRef} accept="image/*" onChange={handleFileChange} />
    </div>
  )
}
