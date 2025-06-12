'use client'

import { CustomTable } from '@/components/composite/CustomTable'
import { Separator } from '@/components/ui/separator'
import { Description } from '@/features/description/types/description'
import ImageAnnotatorContainer from '@/features/image-upload/components/ImageAnnotationContainer'

// <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

export default function Home() {
  const arr: Description[] = [
    {
      id: 1,
      name: 'qwerty',
      type: 'qwerty',
      displayData: 'qwerty',
      displayEvent: 'qwerty',
      note: 'qwerty',
    },
    {
      id: 2,
      name: 'asdfgh',
      type: 'asdfgh',
      displayData: 'asdfgh',
      displayEvent: 'asdfgh',
      note: 'asdfgh',
    },
  ]

  const header = ['項目ID', '項目名', '型', '表示データ', 'イベント', '備考']

  return (
    <div className="flex flex-col gap-4 w-full">
      <ImageAnnotatorContainer width="w-64" height="h-64" />
      <Separator />
      <div className="px-6">
        <CustomTable header={header} arr={arr} />
      </div>
      {/* <DescriptionTable dataArr={arr} /> */}
    </div>
  )
}
