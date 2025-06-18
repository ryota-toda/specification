import { Description } from '@/types/markers'
import { useCallback } from 'react'
import { getImageData } from '@/features/export-xlsx/hooks/useImageDataUrl'
import { downLoadXlsx, generateXlsxWorkbook } from '@/features/export-xlsx/hooks/useExcelUtils'

type HandleExportXlsxProp = { data: Description[] }

export const useExportXlsx = () => {
  const handleExportXlsx = useCallback(async ({ data }: HandleExportXlsxProp) => {
    const result = await getImageData()
    const uint8array = await generateXlsxWorkbook({ data, imageData: result })
    const blob = new Blob([uint8array], { type: 'application/octet-binary' })
    downLoadXlsx({ blob })
  }, [])

  return { handleExportXlsx }
}
