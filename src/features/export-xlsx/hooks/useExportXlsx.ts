import ExcelJS, { Fill } from 'exceljs'
import { Description } from '@/types/markers'
import { useCallback } from 'react'
import { useImageData } from '@/features/export-xlsx/hooks/useImageDataUrl'

type HandleExportXlsxProp = { data: Description[] }

const HEADER_VAL_ARR = [
  '画面',
  'tmpHoge',
  '画面名',
  'tmpFuga',
  '作成者',
  'tmpPiyo',
  '修正者',
  'tmpBuzz',
  '作成日',
  String(new Date().toLocaleString()),
  '修正日',
  String(new Date().toLocaleString()),
]

const HEADER_CELL_ARR = ['A1', 'B1', 'A2', 'B2', 'C1', 'D1', 'C2', 'D2', 'E1', 'F1', 'E2', 'F2']
const MAIN_DATA_HEADERS = ['項目ID', '項目名', '型', '表示データ', 'イベント', '備考']
const DATA_KEYS_ARR = ['markerId', 'name', 'type', 'displayData', 'displayEvent', 'note']
const START_COLUMN_INDEX = 8

const HeaderFillColor: Fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFDDDDDD' },
}

const borderOption: Partial<ExcelJS.Borders> = {
  top: { style: 'thin', color: { argb: 'FF000000' } },
  left: { style: 'thin', color: { argb: 'FF000000' } },
  bottom: { style: 'thin', color: { argb: 'FF000000' } },
  right: { style: 'thin', color: { argb: 'FF000000' } },
}

export const useExportXlsx = () => {
  const { dataUrl } = useImageData()

  const handleExportXlsx = useCallback(async (props: HandleExportXlsxProp) => {
    const { data } = props

    const wb = new ExcelJS.Workbook()
    wb.addWorksheet('画面設計書')
    const ws = wb.getWorksheet('画面設計書')

    if (ws) {
      ws.columns = [
        ...Array.from({ length: 6 }).map(() => ({ width: 23.5 })),
        { key: '' },
        { key: 'markerId', width: 8 },
        { key: 'name', width: 23.5 },
        { key: 'type', width: 8 },
        { key: 'displayData', width: 23.5 },
        { key: 'displayEvent', width: 23.5 },
        { key: 'note', width: 23.5 },
      ]

      HEADER_CELL_ARR.forEach((cell, index) => {
        const targetCell = ws.getCell(cell)
        if (index % 2 === 0) targetCell.fill = HeaderFillColor
        targetCell.value = HEADER_VAL_ARR[index]
        targetCell.border = borderOption
        targetCell.alignment = { vertical: 'middle' }
      })

      const imgId = wb.addImage({ base64: String(dataUrl), extension: 'png' })
      ws.addImage(imgId, 'A4:F38')

      MAIN_DATA_HEADERS.forEach((headerText, index) => {
        const cell = ws.getRow(4).getCell(index + 8)
        cell.fill = HeaderFillColor
        cell.value = headerText
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        cell.border = borderOption
      })

      data.forEach((item, rowIdx) => {
        const targetRow = 5 + rowIdx
        const row = ws.getRow(targetRow)

        DATA_KEYS_ARR.forEach((key, colIdx) => {
          const cell = row.getCell(START_COLUMN_INDEX + colIdx)
          cell.value = item[key]
          cell.border = borderOption
        })
      })
    }

    const uint8array = await wb.xlsx.writeBuffer()
    const blob = new Blob([uint8array], { type: 'application/octet-binary' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = 'tmp.xlsx'
    a.click()
    a.remove()
  }, [])

  return { handleExportXlsx: handleExportXlsx }
}
