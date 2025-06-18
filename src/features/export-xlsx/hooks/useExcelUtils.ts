import ExcelJS, { Fill } from 'exceljs'
import { Description } from '@/types/markers'

type GenerateExcelWorkbookProps = {
  data: Description[]
  imageDataUrl: string
}

const SHEET_CONFIG = {
  initialHeaders: [
    { value: '画面', cell: 'A1', isHeader: true },
    { value: 'tmpHoge', cell: 'B1' },
    { value: '画面名', cell: 'A2', isHeader: true },
    { value: 'tmpFuga', cell: 'B2' },
    { value: '作成者', cell: 'C1', isHeader: true },
    { value: 'tmpPiyo', cell: 'D1' },
    { value: '修正者', cell: 'C2', isHeader: true },
    { value: 'tmpBuzz', cell: 'D2' },
    { value: '作成日', cell: 'E1', isHeader: true },
    { value: String(new Date().toLocaleString()), cell: 'F1' },
    { value: '修正日', cell: 'E2', isHeader: true },
    { value: String(new Date().toLocaleString()), cell: 'F2' },
  ],

  mainDataHeaders: ['項目ID', '項目名', '型', '表示データ', 'イベント', '備考'],
  mainDataHeaderRowNum: 4,

  dataKeys: ['markerId', 'name', 'type', 'displayData', 'displayEvent', 'note'],
  startColumnIndex: 8,

  headerFillColor: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFDDDDDD' },
  } as Fill,

  borderOption: {
    top: { style: 'thin', color: { argb: 'FF000000' } },
    left: { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    right: { style: 'thin', color: { argb: 'FF000000' } },
  } as Partial<ExcelJS.Borders>,
}

export const generateXlsxWorkbook = async ({ data, imageDataUrl }: GenerateExcelWorkbookProps) => {
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

    // NOTE: 画面ヘッダーの設定
    SHEET_CONFIG.initialHeaders.forEach(({ value, cell, isHeader }) => {
      const targetCell = ws.getCell(cell)
      if (isHeader) targetCell.fill = SHEET_CONFIG.headerFillColor
      targetCell.value = value
      targetCell.border = SHEET_CONFIG.borderOption
      targetCell.alignment = { vertical: 'middle' }
    })

    // NOTE: 画像の追加
    if (imageDataUrl) {
      const imgId = wb.addImage({ base64: imageDataUrl, extension: 'png' })
      ws.addImage(imgId, 'A4:F38')
    }

    // NOTE: データヘッダーの設定
    const row = ws.getRow(SHEET_CONFIG.mainDataHeaderRowNum)
    SHEET_CONFIG.mainDataHeaders.forEach((headerText, index) => {
      const cell = row.getCell(index + 8) /* H列は8 */
      cell.fill = SHEET_CONFIG.headerFillColor
      cell.value = headerText
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.border = SHEET_CONFIG.borderOption
    })

    // NOTE: データの設定
    data.forEach((item, rowIdx) => {
      const row = ws.getRow(5 + rowIdx)

      SHEET_CONFIG.dataKeys.forEach((key, colIdx) => {
        const cell = row.getCell(SHEET_CONFIG.startColumnIndex + colIdx)
        cell.value = item[key]
        cell.border = SHEET_CONFIG.borderOption
      })
    })
  }

  return await wb.xlsx.writeBuffer()
}

export const downLoadXlsx = ({ blob }: { blob: Blob }) => {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = 'tmp.xlsx'
  a.click()
  a.remove()
  window.URL.revokeObjectURL(blob)
}
