import { Button } from '@/components/ui/button'
import { useExportXlsx } from '@/features/export-xlsx/hooks/useExportXlsx'
import { descriptionArrAtom } from '@/lib/jotai/atom'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'

export const ExportButton = () => {
  const descriptions = useAtomValue(descriptionArrAtom)
  const { handleExportXlsx } = useExportXlsx()
  return (
    <Button className={clsx('w-fit h-fit')} onClick={() => handleExportXlsx({ data: descriptions })}>
      export .xlsx
    </Button>
  )
}
