import { useState } from 'react'
import { Box } from '@mui/material'

import { MenuIcon } from '@/assets/icons/navigation'
import { UndoIcon } from '@/assets/icons/actions'
import { selectHistoryUndoIsAvailable } from '@/store/reducers'
import { useEditorUndo } from '@/pages/Editor/hooks/useEditorUndo'
import { useAppSelector } from '@/hooks'
import { NavbarMenu } from '@/components/navigation'
import { IconButton } from '@/components'
import { palette } from '@/styles'

export const CommonButtons = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const toggleDrawer = () => {
    setIsMenuOpened(!isMenuOpened)
  }
  const isUndoAvailable = useAppSelector(selectHistoryUndoIsAvailable)
  const undoLastAction = useEditorUndo()

  return (
    <Box position="relative" borderLeft={`1px solid ${palette.paleGrey}`} padding={'0 10px'}>
      <Box display="flex" bgcolor="transparent" borderRadius="9px">
        <IconButton onClick={undoLastAction} disabled={!isUndoAvailable} size="large">
          <UndoIcon />
        </IconButton>
        <IconButton onClick={() => toggleDrawer()} disableMargin size="large">
          <MenuIcon />
        </IconButton>
      </Box>

      <NavbarMenu isMenuOpened={isMenuOpened} handleToggleDrawer={toggleDrawer} />
    </Box>
  )
}
