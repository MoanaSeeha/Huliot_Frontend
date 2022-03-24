import { useContext, useEffect, useState } from 'react'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'

import { ArrowLeft } from '@/assets/icons/navigation'
import { palette } from '@/styles'

import { Arrow } from './Arrow'

export const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators } =
    useContext(VisibilityContext)
  const [disabled, setDisabled] = useState(
    !visibleItemsWithoutSeparators.length && isFirstItemVisible,
  )

  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible)
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators])

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <ArrowLeft fill={palette.grey} />
    </Arrow>
  )
}
