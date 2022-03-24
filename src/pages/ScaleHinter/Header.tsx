import React, { FC, ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { darken } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

import { Button } from '@components/Button'
import { palette, TOP_PANEL_HEIGHT } from '@/styles'

type Props = {
  label: ReactNode
  children: ReactNode
  setHintDisabled: boolean
  setModalOpen: (isModalOpen: boolean) => void
}

export const Header: FC<Props> = ({ label, children, setHintDisabled, setModalOpen }: Props) => {
  const classes = useStyles()
  const { push } = useHistory()

  const goBack = () => {
    push('/')
  }

  const submit = () => {
    setModalOpen(true)
  }

  return (
    <Box className={classes.container}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        className={classes.panel}
      >
        <Button className={classes.discardButton} onClick={goBack}>
          Back
        </Button>

        <Typography align="center">{label}</Typography>

        <Button onClick={submit} disabled={setHintDisabled}>
          Set Hint
        </Button>
      </Box>
      <Box position="relative">{children}</Box>
    </Box>
  )
}

const useStyles = makeStyles(() => {
  return {
    container: {
      height: '100vh',
      width: '100vw',
      '@media only screen and (orientation:portrait)': {
        width: '100vh',
        height: '100vw',
      },
      overflow: 'hidden',
      padding: 0,
    },
    panel: {
      height: TOP_PANEL_HEIGHT,
      position: 'relative',
      background: palette.white,
      zIndex: 1000,
    },

    discardButton: {
      backgroundColor: palette.red,

      '&:hover': {
        backgroundColor: darken(palette.red, 0.2),
      },
    },
  }
})
