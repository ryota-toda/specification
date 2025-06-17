import ExcelJS, { Fill } from 'exceljs'
import { Description } from '@/types/markers'
import { useCallback } from 'react'
import { useImageDataUrl } from '@/features/export-xlsx/hooks/useImageDataUrl'
import { toPng } from 'html-to-image'

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
// const HEADER_ROW_NUMBER = 40

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
  const exportImage = useCallback(async (el: HTMLElement | null) => {
    if (!el) return

    if (!el) return
    const dataUrl = await toPng(el)
    return dataUrl
  }, [])

  const imageNode = window.document.getElementById('image-container')

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

      CELL_ARR.forEach((cell, index) => {
        const targetCell = ws.getCell(cell)
        if (index % 2 === 0) targetCell.fill = HeaderFillColor
        targetCell.value = VAL_ARR[index]
        targetCell.border = borderOption
        targetCell.alignment = { vertical: 'middle' }
      })

      const imageDataUrl = await exportImage(imageNode)
      const imgId = wb.addImage({ base64: imageDataUrl, extension: 'png' })
      if (imageDataUrl) ws.addImage(imgId, 'A4:F38')

      // const headerRow = ws.getRow(HEADER_ROW_NUMBER)

      MAIN_DATA_HEADERS.forEach((headerText, index) => {
        const cell = ws.getRow(1).getCell(index + 8)
        cell.fill = HeaderFillColor
        cell.value = headerText
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
        cell.border = borderOption
      })

      // HACK: リファクタ
      data.forEach(({ markerId, name, type, displayData, displayEvent, note }, index) => {
        ws.getCell(`H${index + 2}`).value = markerId
        ws.getCell(`I${index + 2}`).value = name
        ws.getCell(`J${index + 2}`).value = type
        ws.getCell(`K${index + 2}`).value = displayData
        ws.getCell(`L${index + 2}`).value = displayEvent
        ws.getCell(`M${index + 2}`).value = note

        ws.getCell(`H${index + 2}`).border = borderOption
        ws.getCell(`I${index + 2}`).border = borderOption
        ws.getCell(`J${index + 2}`).border = borderOption
        ws.getCell(`K${index + 2}`).border = borderOption
        ws.getCell(`L${index + 2}`).border = borderOption
        ws.getCell(`M${index + 2}`).border = borderOption
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
