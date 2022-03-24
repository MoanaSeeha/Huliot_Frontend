import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'

import { editingCommentDone } from '@/store/reducers'
import { useAppDispatch } from '@/hooks'
import { getComment, HuliotCanvas, updateComment } from '@/fabric'

type Props = {
  canvas: HuliotCanvas
  selectedObjectId: string | null
  commentedObjectId: string
}
export const CommentEditor = ({ canvas, selectedObjectId, commentedObjectId }: Props) => {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState<string>('')

  const onTextChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setComment(target.value)
    },
    [setComment],
  )

  const onApplyClick = () => {
    updateComment(canvas, commentedObjectId, comment || '')
    dispatch(editingCommentDone())
  }

  const onCloseClick = useCallback(() => {
    dispatch(editingCommentDone())
  }, [dispatch])

  useEffect(() => {
    if (selectedObjectId) {
      const existingComment = getComment(canvas, selectedObjectId)
      setComment(existingComment)
    } else {
      setComment('')
    }
  }, [selectedObjectId])

  return (
    <Box
      position="absolute"
      display="flex"
      flexDirection="row"
      alignItems="center"
      left={0}
      bottom={0}
      width="100%"
      bgcolor="rgba(255,255,255,0.5)"
    >
      <TextField
        multiline
        variant="outlined"
        fullWidth
        minRows={2}
        maxRows={3}
        label={'Add comment'}
        value={comment}
        onChange={onTextChange}
      />
      <IconButton
        color="inherit"
        aria-label="Apply"
        style={{ color: 'green' }}
        onClick={onApplyClick}
        size="large"
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="Close"
        style={{ color: 'red' }}
        onClick={onCloseClick}
        size="large"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  )
}
