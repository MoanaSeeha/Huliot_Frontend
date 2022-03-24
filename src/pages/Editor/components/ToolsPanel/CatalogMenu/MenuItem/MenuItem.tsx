import { useContext } from 'react'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'

import { selectEditorModeState } from '@/store/reducers'
import { useAppSelector } from '@/hooks'
import { IconButton, MenuButton } from '@/components'

type Props = {
  item: any
  itemId: number | string
  onItemClick: (item: any) => void
}

export const MenuItem = ({ item, itemId, onItemClick }: Props) => {
  const visibility = useContext(VisibilityContext)
  const { editorMode, drawingElements } = useAppSelector(selectEditorModeState)

  visibility.isItemVisible(itemId.toString())

  const isActive = () => {
    return item.id === drawingElements[editorMode]
  }

  return (
    <div
      role="button"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '48px',
        height: '48px',
      }}
      tabIndex={0}
      className="menu-item"
    >
      {item?.label ? (
        <MenuButton disableMargin active={isActive()} onClick={() => onItemClick(item)}>
          {item.label}
        </MenuButton>
      ) : (
        <IconButton
          disableMargin
          active={isActive()}
          onClick={() => onItemClick(item)}
          size="large"
        >
          <item.icon />
        </IconButton>
      )}
    </div>
  )
}
