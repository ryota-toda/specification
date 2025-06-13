import { DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Description } from '@/types/markers'

export const CustomDrawerContents = ({ data }: { data: Description }) => {
  console.log('')

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{data.name}</DrawerTitle>
        <div>
          <p>型{data.type}</p>
          <p>表示データ{data.displayData}</p>
          <p>イベント{data.displayEvent}</p>
          <p>備考{data.note}</p>
        </div>
      </DrawerHeader>
    </DrawerContent>
  )
}
