import { Description, Marker } from '@/types/markers'
import { atom } from 'jotai'

export const markModeAtom = atom<boolean>(false)

export const markersAtom = atom<Marker[]>([])

export const descriptionAtom = atom<Description[]>([])
