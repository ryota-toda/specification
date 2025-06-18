'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import { displayDataAtom, markingModeAtom } from '@/lib/jotai/atom'
import clsx from 'clsx'
import { useAtom, useSetAtom } from 'jotai'
import { ChangeEvent } from 'react'

const CustomSidebar = () => {
  const [displayData, setDisplayData] = useAtom(displayDataAtom)
  const setMarkingMode = useSetAtom(markingModeAtom)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetKey = e.target.name
    setDisplayData((prev) => ({ ...prev, [targetKey]: e.target.value }))
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Input type="text" name="name" value={displayData.name} onChange={handleChange} placeholder="画面名を入力" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Input
            type="text"
            name="createdBy"
            value={displayData.createdBy}
            onChange={handleChange}
            placeholder="作成者を入力"
          />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={clsx('p-6')}>
        <div className="flex justify-center gap-4">
          <Switch id="mark" onClick={() => setMarkingMode((prev) => !prev)} />
          <Label htmlFor="mark">Marking Mode</Label>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default CustomSidebar
