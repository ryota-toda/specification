'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const CustomTable = <T extends Record<string, string | number | null>>({
  header,
  arr,
}: {
  header: T[]
  arr: T[]
}) => {
  if (!arr || arr.length === 0) return undefined

  const keys = Object.keys(arr[0]) as Array<keyof T>

  return (
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
          <TableRow key={index}>
            {keys.map((key) => (
              <TableCell key={`${index}_${String(key)}`}>{String(item[key])}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
