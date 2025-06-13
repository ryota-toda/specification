/**
 *id:           項目ID
 *name:         項目名
 *type:         型
 *displayData:  表示データ
 *displayEvent: イベント
 *note:         備考
 * */
export interface Description {
  id: number
  name: string | null
  type: string | null
  displayData: string | null
  displayEvent: string | null
  note: string | null
  [key: string]: string | number | null
}

/**
 *id:       画面ID
 *name:     画面名
 *creator:  作成者
 *created:  作成日
 *updater:  更新者
 *updated:  更新日
 * */
export interface Field {
  id: string
  name: string
  creator: string
  created: Date
  updater: string
  updated: Date
  [key: string]: string | Date
}
