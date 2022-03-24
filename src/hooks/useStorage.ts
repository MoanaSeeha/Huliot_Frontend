import { useCallback } from 'react'
import { useIndexedDB } from 'react-indexed-db'

import { base64ToArrayBuffer, arrayBufferToBase64 } from '@/utils'

export const useStorage = () => {
  const rawBackground = useIndexedDB('rawBackground')
  const background = useIndexedDB('background')

  const saveRawBackground = useCallback(async (binaryData: ArrayBuffer) => {
    await rawBackground.clear()
    return rawBackground.add({ data: arrayBufferToBase64(binaryData) })
  }, [])

  const loadRawBackground = useCallback(async () => {
    const rawData = (await rawBackground.getAll())?.[0]?.data || null
    const file = base64ToArrayBuffer(rawData)
    return new Blob([file], { type: 'application/octet-stream' })
  }, [])

  const resaveRawBackground = useCallback(async () => {
    const rawData = (await rawBackground.getAll())?.[0]?.data || null
    await background.clear()
    return background.add({ data: rawData })
  }, [])

  const saveBackground = useCallback(async (data: ArrayBuffer | string) => {
    await background.clear()
    return background.add({ data: typeof data === 'string' ? data : arrayBufferToBase64(data) })
  }, [])

  const loadBackground = useCallback(async (base64: boolean = false) => {
    const data = (await background.getAll())?.[0]?.data || null
    if (base64) return data

    const file = base64ToArrayBuffer(data)
    return new Blob([file], { type: 'application/octet-stream' })
  }, [])

  const clearBackground = useCallback(() => {
    return background.clear()
  }, [])

  const saveMultipagePdfUrl = useCallback((pdfUrl: string) => {
    sessionStorage.setItem('multipageUrl', pdfUrl)
  }, [])

  const loadMultipagePdfUrl = useCallback((): string | null => {
    return sessionStorage.getItem('multipageUrl')
  }, [])

  return {
    saveRawBackground,
    loadRawBackground,
    resaveRawBackground,
    saveBackground,
    loadBackground,
    clearBackground,
    saveMultipagePdfUrl,
    loadMultipagePdfUrl,
  }
}
