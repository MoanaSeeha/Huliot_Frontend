import { useCallback } from 'react'
import { pdfjs, PDFPageItem } from 'react-pdf'

import { canvasToBlob } from '@/utils'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const usePdfHandlers = () => {
  const getDocument = useCallback(async (pdfUrl: string) => {
    return await pdfjs.getDocument(pdfUrl).promise
  }, [])

  const pageToImage = useCallback(async (pageItem: PDFPageItem, maxDimension: number) => {
    const properScale = getProperScale(pageItem, maxDimension)
    const viewport = pageItem.getViewport({ scale: properScale })
    const canvasElement = window.document.createElement('canvas')
    canvasElement.height = viewport.height
    canvasElement.width = viewport.width
    const canvasContext = canvasElement.getContext('2d') as CanvasRenderingContext2D
    await pageItem.render({ canvasContext, viewport }).promise
    const blob = await canvasToBlob(canvasElement, 'image/png')
    return blob
  }, [])

  return { getDocument, pageToImage }
}

function getProperScale(page: PDFPageItem, maxDimension: number): number {
  const { width, height } = page.getViewport({ scale: 1 })
  return maxDimension / Math.max(width, height)
}
