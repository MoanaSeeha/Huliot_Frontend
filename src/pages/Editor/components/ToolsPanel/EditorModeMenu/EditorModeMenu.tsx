import { Box } from '@mui/material'

import {
  DrawingToolsIcon,
  DrawingVerticalIcon,
  KitsIcon,
  PipeIcon,
  ShowerIcon,
  TrapIcon,
} from '@/assets/icons/constants'
import { MoveIcon } from '@/assets/icons/navigation'
import { MoreIcon } from '@/assets/icons/navigation/MoreIcon'

import { NavigationItem } from './NavigationItem'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { EditorMode, setEditorMode, selectEditorModeState } from '@/store/reducers'

export const EditorModeMenu = () => {
  const dispatch = useAppDispatch()
  const { editorMode } = useAppSelector(selectEditorModeState)

  const clickHandler = (newMode: EditorMode) => {
    if (newMode !== editorMode) {
      dispatch(setEditorMode({ editorMode: newMode }))
    }
  }

  return (
    <>
      <Box display="flex" justifyContent="center" flexGrow={1} px={2}>
        <Box display="flex" justifyContent="center" flexGrow={1}>
          <NavigationItem
            onClick={() => clickHandler('navigation')}
            icon={MoveIcon}
            disabled={false}
            active={editorMode === 'navigation'}
            translateId="App.MainActionsMenu.Navigate"
            tooltipTitle="Navigation mode"
          />

          <NavigationItem
            onClick={() => clickHandler('constants')}
            icon={ShowerIcon}
            disabled={false}
            active={editorMode === 'constants'}
            translateId="App.MainActionsMenu.ConstantsMenu"
            tooltipTitle="Constants icons menu"
          />

          <NavigationItem
            onClick={() => clickHandler('elements')}
            icon={TrapIcon}
            disabled={false}
            active={editorMode === 'elements'}
            translateId="App.MainActionsMenu.ElementsMenu"
            tooltipTitle="Elements icons menu"
          />

          <NavigationItem
            onClick={() => clickHandler('kits')}
            icon={KitsIcon}
            disabled
            translateId="App.MainActionsMenu.KitsMenu"
            tooltipTitle="Kits menu"
          />

          <NavigationItem
            onClick={() => clickHandler('pipes')}
            icon={PipeIcon}
            disabled={false}
            active={editorMode === 'pipes'}
            translateId="App.MainActionsMenu.Pipes"
            tooltipTitle="Pipes placement"
          />

          <NavigationItem
            onClick={() => clickHandler('verticals')}
            icon={DrawingVerticalIcon}
            disabled
            // active={editorMode === 'verticals'}
            translateId="App.MainActionsMenu.Verticals"
            tooltipTitle="Verticals placement"
          />

          <NavigationItem
            onClick={() => clickHandler('tools')}
            icon={DrawingToolsIcon}
            active={editorMode === 'tools'}
            translateId="App.MainActionsMenu.Tools"
            tooltipTitle="Tooling icons"
          />

          <NavigationItem
            disableBorder
            onClick={() => clickHandler('more')}
            icon={MoreIcon}
            // active={editorMode === 'more'}
            translateId="App.MainActionsMenu.More"
            tooltipTitle="Additional actions"
          />
        </Box>
      </Box>
    </>
  )
}
