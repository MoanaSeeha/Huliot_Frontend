import { useEffect, useState } from 'react'

type SetBlob = (data: Blob | null) => void
export const useImageBlob = (): [string | null, SetBlob] => {
  const [blobData, setBlobData] = useState<Blob | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  useEffect(() => {
    if (blobData) {
      const url = URL.createObjectURL(blobData)
      setBlobUrl(url)
    } else {
      setBlobUrl(null)
    }
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl)
      }
    }
  }, [blobData])

  return [blobUrl, setBlobData]
}
