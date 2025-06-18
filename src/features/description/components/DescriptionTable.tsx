'use client'

import { Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CustomDrawerContents } from '@/features/description/components/CustomDrawerContents'
import { Description } from '@/types/description'
import { Fragment, useState } from 'react'

type DescriptionTableProps<T> = {
  header: string[]
  arr: T[]
}

export const DescriptionTable = <T extends Record<string, string | number | undefined>>({
  header,
  arr,
}: DescriptionTableProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<Description | null>(null)

  if (!arr || arr.length === 0) return <></>

  const keys = Object.keys(arr[0]) as Array<keyof T>

  return (
    <Drawer direction="right">
      <Table>
        <TableHeader>
          <TableRow>
            {header.map((key, index) => (
              <TableHead key={index}>{String(key)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {arr.map((item, index) => (
            <Fragment key={index}>
              <TableRow>
                {keys.map((key, i) => (
                  <DrawerTrigger asChild key={i}>
                    <TableCell onClick={() => setSelectedItem(item)} key={`${index}_${String(key)}`}>
                      {String(item[key])}
                    </TableCell>
                  </DrawerTrigger>
                ))}
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
      {selectedItem && <CustomDrawerContents data={selectedItem} />}
    </Drawer>
  )
}
