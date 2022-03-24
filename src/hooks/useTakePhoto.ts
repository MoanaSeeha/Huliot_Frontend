import { useRef, useCallback, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { RouteNames } from '@/routes'
import { useStorage } from '@/hooks'
import { readBlobAsArrayBuffer } from '@/utils'

export const useTakePhoto = () => {
  const takePhotoRef = useRef<HTMLInputElement>(null)
  const { push } = useHistory()
  const { saveRawBackground } = useStorage()

  const clickHandler = useCallback(() => {
    takePhotoRef.current?.click()
  }, [takePhotoRef])

  const changeHandler = useCallback(
    async (event: FormEvent<HTMLInputElement>) => {
      const file = (event.target as HTMLInputElement).files?.[0] as Blob
      if (file) {
        const binaryData = await readBlobAsArrayBuffer(file)
        await saveRawBackground(binaryData)
        push(RouteNames.EDIT_BACKGROUND_IMAGE)
      }
    },
    [takePhotoRef],
  )

  return [takePhotoRef, clickHandler, changeHandler]
}
