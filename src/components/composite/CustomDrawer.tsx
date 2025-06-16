'use client'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer'
import { DialogTitle } from '@radix-ui/react-dialog'

export const CustomDrawer = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>qweert</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DialogTitle>qweert</DialogTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
