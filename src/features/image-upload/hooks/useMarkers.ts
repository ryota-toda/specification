import { Marker } from '@/types/markers'
import { markersAtom, markingModeAtom } from '@/lib/jotai/atom'
import { useAtom, useAtomValue } from 'jotai'
import { MouseEvent, RefObject, useCallback } from 'react'

type UseMarkersReturn = { addMarker: (e: MouseEvent, containerRef: RefObject<HTMLDivElement | null>) => void }

export const useMarkers = (): UseMarkersReturn => {
  const isMarkingMode = useAtomValue(markingModeAtom)
  const [markers, setMarkers] = useAtom(markersAtom)

  const addMarker = useCallback(
    (e: MouseEvent, containerRef: RefObject<HTMLDivElement | null>) => {
      if (!containerRef?.current || !isMarkingMode) return

      const rect = containerRef.current.getBoundingClientRect()

      const [clX, clY] = [e.clientX, e.clientY]
      const [x, y] = [clX - rect.left, clY - rect.top]

      const newMarker: Marker = { id: markers.length + 1, x, y }

      setMarkers((prev) => [...prev, newMarker])
    },
    [markers, isMarkingMode, setMarkers],
  )

  return { addMarker }
}
