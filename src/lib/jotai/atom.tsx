import { Marker } from '@/types/markers'
import { Description } from '@/types/description'
import { atom } from 'jotai'
import { DisplayData } from '@/types/display'

export const markersAtom = atom<Marker[]>([])
export const markingModeAtom = atom<boolean>(false)

export const descriptionAtom = atom<Description>()
export const descriptionArrAtom = atom<Description[]>([])

export const displayDataAtom = atom<DisplayData>({ id: 0, name: '', createdBy: '' })
