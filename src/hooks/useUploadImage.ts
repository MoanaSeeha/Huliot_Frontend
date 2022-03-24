import { useEffect } from 'react'
import { useFilePicker } from 'use-file-picker'
import { useHistory } from 'react-router-dom'

import { RouteNames } from '@/routes'
import { useAppDispatch, useStorage } from '@/hooks'
import { setLoading } from '@/store/reducers'

export const useUploadImage = () => {
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: 'image/*',
    multiple: false,
    readAs: 'ArrayBuffer',
  })
  const { saveRawBackground } = useStorage()
  const { push } = useHistory()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!filesContent.length) return

    dispatch(setLoading())

    const file = filesContent[0].content as unknown as ArrayBuffer
    saveRawBackground(file).then(() => {
      push(RouteNames.EDIT_BACKGROUND_IMAGE)
    })
  }, [filesContent])

  return openFileSelector
}
