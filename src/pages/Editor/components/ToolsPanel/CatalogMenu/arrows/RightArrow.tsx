import { useContext, useEffect, useState } from 'react'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'

import { ArrowRight } from '@/assets/icons/navigation'
import { palette } from '@/styles'

import { Arrow } from './Arrow'

export const RightArrow = () => {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    useContext(VisibilityContext)
  const [disabled, setDisabled] = useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible,
  )

  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible)
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators])

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <ArrowRight fill={palette.grey} />
    </Arrow>
  )
}
