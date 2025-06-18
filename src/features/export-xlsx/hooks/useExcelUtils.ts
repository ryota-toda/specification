import ExcelJS, { Fill, Worksheet } from 'exceljs'
import { Description } from '@/types/markers'

type getImageDataReturn = {
  dataUrl: string
  width: number
  height: number
}

type GenerateExcelWorkbookProps = {
  data: Description[]
  imageData?: getImageDataReturn
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
  startRowIndex: 44,

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
const getCellRangePixelSize = (ws: Worksheet, startCol: number, startRow: number, endCol: number, endRow: number) => {
  let rangeWidth = 0
  for (let c = startCol; c <= endCol; c++) {
    // NOTE: デフォルト文字幅に約7pxを掛ける (概算)
    rangeWidth += (ws.getColumn(c + 1).width || 8.43) * 7
  }

  let rangeHeight = 0
  for (let r = startRow; r <= endRow; r++) {
    // NOTE: デフォルト15pt
    rangeHeight += (ws.getRow(r + 1).height || 15) * (4 / 3)
  }
  return { width: rangeWidth, height: rangeHeight }
}

export const generateXlsxWorkbook = async ({ data, imageData }: GenerateExcelWorkbookProps) => {
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
    if (imageData) {
      const { dataUrl, width, height } = imageData

      // NOTE: A4とF38を定義
      const [targetStartCol, targetStartRow] = [0, 3]
      const [targetEndCol, targetEndRow] = [5, 37]

      const targetRangeSize = getCellRangePixelSize(ws, targetStartCol, targetStartRow, targetEndCol, targetEndRow)
      const imageAspectRatio = width / height
      const rangeAspectRatio = targetRangeSize.width / targetRangeSize.height

      let [finalWidth, finalHeight] = [targetRangeSize.width, targetRangeSize.height]

      if (imageAspectRatio > rangeAspectRatio) {
        // 画像の方が横長の場合 (幅を基準に高さを調整)
        finalHeight = targetRangeSize.width / imageAspectRatio
      } else {
        // 画像の方が縦長の場合 (高さを基準に幅を調整)
        finalWidth = targetRangeSize.height * imageAspectRatio
      }

      const imgId = wb.addImage({ base64: dataUrl, extension: 'png' })
      ws.addImage(imgId, {
        tl: { col: targetStartCol, row: targetStartRow },
        ext: { width: finalWidth, height: finalHeight },
      })
    }

    // NOTE: データヘッダーの設定
    const row = ws.getRow(SHEET_CONFIG.startRowIndex)
    SHEET_CONFIG.mainDataHeaders.forEach((headerText, index) => {
      const cell = row.getCell(index + 1)
      cell.fill = SHEET_CONFIG.headerFillColor
      cell.value = headerText
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.border = SHEET_CONFIG.borderOption
    })

    // NOTE: データの設定
    data.forEach((item, rowIdx) => {
      const row = ws.getRow(SHEET_CONFIG.startRowIndex + rowIdx + 1)

      SHEET_CONFIG.dataKeys.forEach((key, colIdx) => {
        const cell = row.getCell(colIdx + 1)
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
