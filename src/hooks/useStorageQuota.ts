import { useEffect, useState } from 'react'

export const useStorageQuota = (): StorageEstimate | null => {
  const [quota, setQuota] = useState<StorageEstimate | null>(null)
  useEffect(() => {
    navigator.storage?.estimate().then((estimate) => {
      setQuota(estimate)
    })
  }, [])

  return quota
}
