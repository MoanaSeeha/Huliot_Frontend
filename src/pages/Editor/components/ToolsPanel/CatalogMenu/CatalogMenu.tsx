import React from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Box } from '@mui/material'

import { CloseIcon } from '@/assets/icons/navigation'
import { IconButton } from '@/components'
import { palette } from '@/styles'

import { LeftArrow, RightArrow } from './arrows'
import { MenuItem } from './MenuItem'

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>

type Props = {
  items: any[]
  onGoBackClick: () => void
  onItemClick: (item: any) => void
}

export const CatalogMenu = ({ items, onGoBackClick, onItemClick }: Props) => {
  const onWheelScroll = (apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void => {
    const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

    if (isTouchpad) {
      ev.stopPropagation()
      return
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext()
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev()
    }
  }

  return (
    <>
      <Box justifyContent="center" px={1} borderRight={`1px solid ${palette.paleGrey}`}>
        <IconButton disableMargin active onClick={onGoBackClick} size="large">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box width="calc(100% - 161px)">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={onWheelScroll}>
          {items.map((item) => (
            <MenuItem item={item} itemId={item.id} key={item.id} onItemClick={onItemClick} />
          ))}
        </ScrollMenu>
      </Box>
    </>
  )
}
