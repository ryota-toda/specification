'use client'

import { Separator } from '@/components/ui/separator'
import { DescriptionTable } from '@/features/description/components/DescriptionTable'
import { Description, Marker } from '@/types/markers'
import ImageAnnotatorContainer from '@/features/image-upload/components/ImageAnnotationContainer'
import { useCallback, useEffect } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { descriptionArrAtom, markersAtom } from '@/lib/jotai/atom'
import { ExportButton } from '@/features/export-xlsx/components/ExportButton'
import clsx from 'clsx'

// <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

export default function Home() {
  const markers = useAtomValue(markersAtom)
  const [descriptions, setDescriptions] = useAtom(descriptionArrAtom)

  const hhh = (markers: Marker[]): Description | undefined => {
    if (markers.length === 0) return undefined

    const lastItem = markers[markers.length - 1]

    return {
      id: markers.length,
      markerId: lastItem.id,
      name: 'name',
      type: 'type',
      displayData: 'displayData',
      displayEvent: 'displayEvent',
      note: `${markers.length}`,
    }
  }

  const addDescriptions = useCallback(
    (mark: Marker[]) => {
      setDescriptions((prev) => (prev ? [...prev, hhh(mark)] : [hhh(mark)]))
    },
    [setDescriptions],
  )

  useEffect(() => {
    if (markers.length === 0) return
    addDescriptions(markers)
  }, [markers])

  const header = ['データID', '項目ID', '項目名', '型', '表示データ', 'イベント', '備考']

  return (
    <div className="flex flex-col gap-4 w-full">
      <ImageAnnotatorContainer width="w-64" height="h-64" />
      <Separator />

      <div className="px-6">
        <DescriptionTable header={header} arr={descriptions} />
      </div>
      {descriptions.length > 0 && (
        <div className={clsx('flex justify-end')}>
          <ExportButton />
        </div>
      )}
    </div>
  )
}
