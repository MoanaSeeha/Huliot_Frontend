import { RefObject, useCallback, useEffect, useState } from 'react'

import { Box, Button, Card, Divider, Tooltip } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined'

import { useAppDispatch, useAppSelector, useContainerSize } from '@/hooks'
import { Translate } from '@components/Translate'
import { findObjectBySingleId, getComment, HuliotCanvas } from '@/fabric'
import { editComment, selectHistoryLastUserAction, selectSelectedArea } from '@/store/reducers'
import { usePrevious } from '@/pages/Editor/hooks'

type Props = {
  canvas: HuliotCanvas
  selectedObjectId: string
  commentedObjectId: string | null
}

export const SelectedObjectMenu = ({ canvas, selectedObjectId, commentedObjectId }: Props) => {
  const classes = useClasses()
  const dispatch = useAppDispatch()
  const last = useAppSelector(selectHistoryLastUserAction)
  const previousAction = usePrevious(last)
  const [ref, left, top] = useMenuPosition(canvas)
  const [comment, setComment] = useState<string>('')

  const onAddCommentClick = useCallback(() => {
    dispatch(editComment({ commentedObjectId: selectedObjectId }))
  }, [dispatch])

  const onDeleteClick = useCallback(() => {
    const obj = findObjectBySingleId(canvas, selectedObjectId)
    if (obj) {
      // @ts-ignore
      obj.remove()
      canvas.remove(obj)
    }
  }, [canvas])

  useEffect(() => {
    const existingComment = getComment(canvas, selectedObjectId)
    setComment(existingComment)
  }, [canvas, commentedObjectId, selectedObjectId])

  useEffect(() => {
    if (previousAction?.userAction === 'update/comment') {
      // @ts-ignore
      if (previousAction.comment !== last?.comment) {
        setComment(previousAction.comment)
      }
    }
  }, [last])

  return (
    <div ref={ref} style={{ position: 'absolute', left, top }}>
      <Card className={classes.card}>
        <Box display="flex">
          <Button onClick={onAddCommentClick} disabled={selectedObjectId === commentedObjectId}>
            <Tooltip
              title={
                <Translate id="App.SelectedContextMenu.AddComment" defaultMessage="Add Comment" />
              }
            >
              {!!comment ? <CommentOutlinedIcon /> : <AddCommentOutlinedIcon />}
            </Tooltip>
          </Button>
          <Divider orientation="vertical" flexItem />

          <Button onClick={onDeleteClick}>
            <Tooltip
              title={<Translate id="App.SelectedContextMenu.Delete" defaultMessage="Delete" />}
            >
              <DeleteForeverOutlinedIcon />
            </Tooltip>
          </Button>
          <Divider orientation="vertical" flexItem />

          <Button disabled>
            <Tooltip
              title={
                <Translate id="App.SelectedContextMenu.Duplicate" defaultMessage="Duplicate" />
              }
            >
              <AddToPhotosOutlinedIcon />
            </Tooltip>
          </Button>

          <Divider orientation="vertical" flexItem />
          <Button disabled>
            <Tooltip title={<Translate id="App.SelectedContextMenu.Copy" defaultMessage="Copy" />}>
              <FileCopyOutlinedIcon />
            </Tooltip>
          </Button>
        </Box>
      </Card>
    </div>
  )
}

const useClasses = makeStyles(() => ({
  card: {
    '& button': {
      padding: 4,
    },
  },
}))

const useMenuPosition = (canvas: HuliotCanvas): [RefObject<HTMLDivElement>, number, number] => {
  const [ref, menuWidth, menuHeight] = useContainerSize()
  const area = useAppSelector(selectSelectedArea)
  const [position, setPosition] = useState<[number, number]>([0, 0])

  useEffect(() => {
    if (!area || !canvas?.width || !canvas?.height || !menuWidth || !menuHeight) return
    const topDistance = area.top
    const bottomDistance = canvas.height - (area.top + area.height)

    // Put the menu in the top left corner by default
    let top = 0
    let left = 0

    // If there is enough space above the object put the object 10 px above
    // otherwise put it 10 px below
    if (topDistance > menuHeight + 10) top = area.top - menuHeight - 10
    else if (bottomDistance > menuHeight + 10) top = area.top + area.height + 10

    const objectCenter = area.left + area.width / 2
    // Get left and right coordinates of the menu centered about the object
    const centeredMenuLeft = objectCenter - menuWidth / 2
    const centeredMenuRight = objectCenter + menuWidth / 2

    // Adjust menu horizontal position to not go beyond the canvas
    if (centeredMenuLeft >= 0 && centeredMenuRight <= canvas.width) {
      left = centeredMenuLeft
    } else if (centeredMenuLeft < 0) {
      left = 0
    } else if (centeredMenuRight > canvas.width) {
      left = canvas.width - menuWidth - 1
    }

    setPosition([left, top])
  }, [canvas.width, canvas.height, area, menuWidth, menuHeight])

  return [ref, ...position]
}
