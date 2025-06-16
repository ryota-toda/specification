export type Marker = {
  id: number
  x: number
  y: number
}

/**
 *id:           項目ID
 *markerId      interface Merkerのid
 *name:         項目名
 *type:         型
 *displayData:  表示データ
 *displayEvent: イベント
 *note:         備考
 * */
export type Description = {
  id: number
  markerId: number | undefined
  name: string | undefined
  type: string | undefined
  displayData: string | undefined
  displayEvent: string | undefined
  note: string | undefined
  [key: string]: string | number | undefined
}

/**
 *id:       画面ID
 *name:     画面名
 *creator:  作成者
 *created:  作成日
 *updater:  更新者
 *updated:  更新日
 * */
export type Field = {
  id: string
  name: string
  creator: string
  created: Date
  updater: string
  updated: Date
  [key: string]: string | Date
}
