import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFilePicker } from 'use-file-picker'

import { RouteNames } from '@/routes'
import { useAppDispatch, usePdfHandlers, useStorage } from '@/hooks'
import { decodeModel, readBlobAsArrayBuffer } from '@/utils'
import { loadModel, setLoading } from '@/store/reducers'
import { A4_WIDTH } from '@/styles'

export const useUploadPdf = () => {
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: 'application/pdf',
    multiple: false,
    readAs: 'ArrayBuffer',
  })
  const { saveRawBackground, saveMultipagePdfUrl, saveBackground } = useStorage()
  const { push } = useHistory()
  const { pageToImage, getDocument } = usePdfHandlers()
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function onFileUpdate() {
      if (!filesContent.length) return

      let isLoaded = false

      if (!isLoaded || loading) {
        dispatch(setLoading())
      }

      const load = async () => {
        const binaryData = filesContent[0].content
        const pdfBlob = new Blob([binaryData], { type: 'application/pdf' })
        const pdfBlobUrl = URL.createObjectURL(pdfBlob)
        const pdfDocument = await getDocument(pdfBlobUrl)

        const attachments = await pdfDocument.getAttachments()
        const huliotModel = decodeModel(attachments)

        if (huliotModel) {
          dispatch(loadModel(huliotModel.model))
          huliotModel.background && (await saveBackground(huliotModel.background))
          isLoaded = true
          push(RouteNames.EDITOR)
        } else if (pdfDocument.numPages > 1) {
          isLoaded = true
          saveMultipagePdfUrl(pdfBlobUrl)
          push(RouteNames.PDF_PAGE_SELECTOR)
        } else {
          const pageItem = await pdfDocument.getPage(1)
          const pageBlob = await pageToImage(pageItem, A4_WIDTH)
          if (pageBlob) {
            isLoaded = true
            const binaryBg = await readBlobAsArrayBuffer(pageBlob)
            await saveRawBackground(binaryBg)
            push(RouteNames.EDIT_BACKGROUND_IMAGE)
          }
        }
      }

      await load()
    }

    onFileUpdate()
  }, [filesContent, loading])

  return openFileSelector
}
