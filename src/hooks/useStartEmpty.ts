import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppDispatch, useStorage } from '@/hooks'
import { RouteNames } from '@/routes'
import { clearModel } from '@/store/reducers'

export const useStartEmpty = () => {
  const history = useHistory()
  const { clearBackground } = useStorage()
  const dispatch = useAppDispatch()

  const startEmpty = useCallback(async () => {
    await clearBackground()
    dispatch(clearModel())
    history.push(RouteNames.EDITOR)
  }, [])

  return startEmpty
}
