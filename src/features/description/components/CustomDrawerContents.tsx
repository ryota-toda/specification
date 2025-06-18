'use client'

import { DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useEditDescription } from '@/features/description/hooks/useEditDescription'
import { Description } from '@/types/description'
import clsx from 'clsx'
import { ReactNode } from 'react'

const EditableContents = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div>
      <p>{title}</p>
      {children}
    </div>
  )
}

export const CustomDrawerContents = ({ data }: { data: Description }) => {
  const { handleEdit } = useEditDescription()

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{data.markerId}</DrawerTitle>
      </DrawerHeader>

      <div className={clsx('flex flex-col gap-12 px-4')}>
        <EditableContents title="項目名">
          <Input defaultValue={data.name} onChange={(e) => handleEdit({ e, markerId: data.markerId, name: 'name' })} />
        </EditableContents>

        <EditableContents title="型">
          <Input defaultValue={data.type} onChange={(e) => handleEdit({ e, markerId: data.markerId, name: 'type' })} />
        </EditableContents>

        <EditableContents title="表示データ">
          <Input
            defaultValue={data.displayData}
            onChange={(e) => handleEdit({ e, markerId: data.markerId, name: 'displayData' })}
          />
        </EditableContents>

        <EditableContents title="イベント">
          <Textarea
            defaultValue={data.displayEvent}
            onChange={(e) => handleEdit({ e, markerId: data.markerId, name: 'displayEvent' })}
          />
        </EditableContents>

        <EditableContents title="備考">
          <Textarea
            defaultValue={data.note}
            onChange={(e) => handleEdit({ e, markerId: data.markerId, name: 'note' })}
          />
        </EditableContents>
      </div>
    </DrawerContent>
  )
}
