import ExcelJS from 'exceljs'
import { Description } from '@/types/markers'
import { useCallback } from 'react'

type HandleExportXlsxProp = { data: Description[] }

const VAL_ARR = [
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

const CELL_ARR = ['A1', 'B1', 'A2', 'B2', 'C1', 'D1', 'C2', 'D2', 'E1', 'F1', 'E2', 'F2']
const MAIN_DATA_HEADERS = ['項目ID', '項目名', '型', '表示データ', 'イベント', '備考']
const HEADER_ROW_NUMBER = 12

const borderOption: Partial<ExcelJS.Borders> = {
  top: { style: 'thin', color: { argb: 'FF000000' } },
  left: { style: 'thin', color: { argb: 'FF000000' } },
  bottom: { style: 'thin', color: { argb: 'FF000000' } },
  right: { style: 'thin', color: { argb: 'FF000000' } },
}
export const useExportXlsx = () => {
  const handleExportXlsx = useCallback(async (props: HandleExportXlsxProp) => {
    const { data } = props

    const wb = new ExcelJS.Workbook()
    wb.addWorksheet('tmp')
    const ws = wb.getWorksheet('tmp')

    if (ws) {
      ws.columns = [
        { key: 'markerId' },
        { key: 'name' },
        { key: 'type' },
        { key: 'displayData' },
        { key: 'displayEvent' },
        { key: 'note' },
      ]

      CELL_ARR.forEach((cell, index) => {
        const targetCell = ws.getCell(cell)

        targetCell.value = VAL_ARR[index]
        targetCell.border = borderOption
        targetCell.alignment = { vertical: 'middle' }
      })

      const headerRow = ws.getRow(HEADER_ROW_NUMBER)

      MAIN_DATA_HEADERS.forEach((headerText, index) => {
        const cell = headerRow.getCell(index + 1)
        cell.value = headerText
        cell.font = { bold: true }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        cell.border = borderOption
      })

      data.forEach(({ markerId, name, type, displayData, displayEvent, note }) => {
        const row = ws.addRow({ markerId, name, type, displayData, displayEvent, note })

        row.eachCell({ includeEmpty: false }, (cell) => {
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

  return { handleExportXlsx }
}
