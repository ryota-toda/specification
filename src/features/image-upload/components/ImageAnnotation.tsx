'use client'

import MarkerBlock from '@/features/image-upload/components/MarkerBlock'
import { useMarkers } from '@/features/image-upload/hooks/useMarkers'
import { Marker } from '@/features/image-upload/types/marker'
import { markersAtom } from '@/lib/jotai/atom'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'

type ImageAnnotationProps = {
  imageUrl: string
  onMarkersChange: (markers: Marker[]) => void
}

export const ImageAnnotation = ({ imageUrl }: ImageAnnotationProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const markers = useAtomValue(markersAtom)
  const { addMarker } = useMarkers({ containerRef })

  return (
    <div
      id="image-container"
      ref={containerRef}
      className=" relative w-full h-full object-contains"
      onClick={addMarker}
    >
      <img src={imageUrl} alt="selected image" draggable={false} className="w-full h-full object-contain select-none" />

      {markers.map(({ id, x, y }) => (
        <MarkerBlock key={id} id={id} x={x} y={y} />
      ))}
    </div>
  )
}
