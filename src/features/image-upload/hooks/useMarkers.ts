import { Marker } from '@/features/image-upload/types/marker'
import { markersAtom, markModeAtom } from '@/lib/jotai/atom'
import { useAtom, useAtomValue } from 'jotai'
import { MouseEvent, useCallback } from 'react'

interface UseMarkersProps {
  containerRef?: HTMLDivElement
}

interface UseMarkersReturn {
  addMarker: (e: MouseEvent<HTMLDivElement>) => void
  resetMarkers: () => void
}

export const useMarkers = ({ containerRef }: UseMarkersProps): UseMarkersReturn => {
  const iii = useAtomValue(markModeAtom)
  const [markers, setMarkers] = useAtom(markersAtom)

  const addMarker = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !iii) return

      const rect = containerRef.current.getBoundingClientRect()

      const [clX, clY] = [e.clientX, e.clientY]
      const [x, y] = [clX - rect.left, clY - rect.top]

      const newMarker: Marker = { id: markers.length + 1, x, y }

      setMarkers((prev) => [...prev, newMarker])
    },
    [markers, iii, containerRef, setMarkers],
  )

  const resetMarkers = useCallback(() => {
    setMarkers([])
  }, [setMarkers])

  return { addMarker, resetMarkers }
}
