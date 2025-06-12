"use client";

import MarkerBlock from "@/features/image-upload/components/MarkerBlock";
import { useMarkers } from "@/features/image-upload/hooks/useMarkers";
import { Marker } from "@/features/image-upload/types/marker";
import { markModeAtom } from "@/lib/jotai/atom";
import { useAtomValue } from "jotai";
import { useRef } from "react";

interface ImageAnnotationProps {
  imageUrl: string;
  onMarkersChange: (markers: Marker[]) => void;
}

export const ImageAnnotation = ({ imageUrl }: ImageAnnotationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMarkMode = useAtomValue(markModeAtom);
  const { markers, addMarker } = useMarkers({ isMarkMode, containerRef });

  return (
    <div
      ref={containerRef}
      className=" relative w-full h-full"
      onClick={addMarker}
    >
      <img
        src={imageUrl}
        alt="selected image"
        draggable={false}
        className="w-full h-full object-contain select-none"
      />

      {markers.map(({ id, x, y }) => (
        <MarkerBlock key={id} id={id} x={x} y={y} />
      ))}
    </div>
  );
};
