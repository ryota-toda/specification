import { Marker } from "@/features/image-upload/types/marker";
import { MouseEvent, useCallback, useState } from "react";

interface UseMarkersProps {
  isMarkMode: boolean;
  containerRef: HTMLDivElement;
}

interface UseMarkersReturn {
  markers: Marker[];
  addMarker: (e: MouseEvent<HTMLDivElement>) => void;
  resetMarkers: () => void;
}

export const useMarkers = ({
  isMarkMode,
  containerRef,
}: UseMarkersProps): UseMarkersReturn => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const addMarker = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !isMarkMode) return;

      const rect = containerRef.current.getBoundingClientRect();

      const [clX, clY] = [e.clientX, e.clientY];
      const [x, y] = [clX - rect.left, clY - rect.top];

      const newMarker: Marker = { id: markers.length + 1, x, y };

      setMarkers((prev) => [...prev, newMarker]);
    },
    [markers, isMarkMode, containerRef],
  );

  const resetMarkers = useCallback(() => {
    setMarkers([]);
  }, []);

  return { markers, addMarker, resetMarkers };
};
