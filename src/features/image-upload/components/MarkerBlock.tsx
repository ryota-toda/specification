import { Marker } from '@/features/image-upload/types/marker'
import clsx from 'clsx'
import { FC } from 'react'

const MarkerBlock: FC<Marker> = ({ id, x, y }) => {
  return (
    <div
      className={clsx(
        'absolute',
        'w-6 h-6 z-1 -translate-x-1/2 -translate-y-1/2',
        'rounded border-white border bg-yellow-500 opacity-75',
        'text-center',
        'cursor-default',
      )}
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      {id}
    </div>
  )
}

export default MarkerBlock
