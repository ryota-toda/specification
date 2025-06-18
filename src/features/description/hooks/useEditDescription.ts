import { descriptionArrAtom } from '@/lib/jotai/atom'
import { Description } from '@/types/description'
import { useSetAtom } from 'jotai'
import { ChangeEvent, useCallback } from 'react'

type UseCallbackProps = {
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  markerId: Description['markerId']
  name: keyof Description
}

export const useEditDescription = () => {
  const setDescriptions = useSetAtom(descriptionArrAtom)

  const handleEdit = useCallback(
    (props: UseCallbackProps) => {
      const { e, markerId, name } = props

      if (!markerId) return

      setDescriptions((prev) => {
        const newState = [...prev]
        const target = newState.find(({ markerId: prevMarkerId }) => markerId === prevMarkerId)
        if (target) target[name] = e.target.value
        return newState
      })
    },
    [setDescriptions],
  )

  return { handleEdit }
}
