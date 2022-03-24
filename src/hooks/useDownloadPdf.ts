import { useCallback } from 'react'
import { PageSizes, PDFDocument } from 'pdf-lib'

import { downloadBlob, encodeModel, LAYOUT_JSON_NAME, renderLayout } from '@/utils'
import { HuliotModel } from '@/fabric'
import { useStorage } from '@/hooks/useStorage'

export const useDownloadPdf = () => {
  const { loadBackground } = useStorage()

  const pdfExport = useCallback(
    async (layoutModel: HuliotModel, fileName: string = 'export.pdf') => {
      const background = await loadBackground(true)
      const pdfDoc = await PDFDocument.create()

      await pdfDoc.attach(encodeModel(layoutModel, background), LAYOUT_JSON_NAME, {
        mimeType: 'application/json',
        description: 'Huliot attachment',
        creationDate: new Date(),
        modificationDate: new Date(),
      })

      const [width, height] = PageSizes.A4
      const page = pdfDoc.addPage([height, width])

      await renderLayout(pdfDoc, page, layoutModel, background)

      const pdfBytes = await pdfDoc.save()
      downloadBlob(pdfBytes, fileName, 'application/pdf')
    },
    [],
  )

  return pdfExport
}
