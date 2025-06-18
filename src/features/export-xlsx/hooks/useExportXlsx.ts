import { Description } from '@/types/description'
import { useCallback } from 'react'
import { getImageData } from '@/features/export-xlsx/hooks/useImageDataUrl'
import { downLoadXlsx, generateXlsxWorkbook } from '@/features/export-xlsx/hooks/useExcelUtils'
import { displayDataAtom } from '@/lib/jotai/atom'
import { useAtomValue } from 'jotai'

type HandleExportXlsxProp = { data: Description[] }

export const useExportXlsx = () => {
  const displayData = useAtomValue(displayDataAtom)
  const handleExportXlsx = useCallback(
    async ({ data }: HandleExportXlsxProp) => {
      const result = await getImageData()
      const uint8array = await generateXlsxWorkbook({ data, displayData, imageData: result })
      const blob = new Blob([uint8array], { type: 'application/octet-binary' })
      downLoadXlsx({ blob })
    },
    [displayData],
  )

  return { handleExportXlsx }
}
