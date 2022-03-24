import React, { FunctionComponent, MouseEvent } from 'react'
import { Box, Tooltip } from '@mui/material'

import { IconButton } from '@/components'
import { palette } from '@/styles'
import { Translate } from '@components/Translate'

type Props = {
  onClick?: (evt: MouseEvent<any>) => void
  icon: FunctionComponent<any>
  disabled?: boolean
  active?: boolean
  disableBorder?: boolean
  translateId?: string
  tooltipTitle?: string
}

type TooltipProps = {
  children: any
}

export const NavigationItem = ({
  active,
  disabled,
  icon: ItemIcon,
  onClick,
  disableBorder = false,
  translateId = '',
  tooltipTitle,
}: Props) => {
  const TooltipWrapper = ({ children }: TooltipProps) =>
    tooltipTitle ? (
      <Tooltip
        key={translateId}
        title={<Translate id={translateId} defaultMessage={tooltipTitle} />}
      >
        {children}
      </Tooltip>
    ) : (
      <>{children}</>
    )

  return (
    <TooltipWrapper>
      <Box p={0.5} borderRight={disableBorder ? 'none' : `1px solid ${palette.paleGrey}`}>
        <IconButton
          disableMargin
          active={active}
          disabled={disabled}
          onClick={onClick}
          size="large"
        >
          <ItemIcon />
        </IconButton>
      </Box>
    </TooltipWrapper>
  )
}
