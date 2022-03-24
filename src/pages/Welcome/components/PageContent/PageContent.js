import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

import { StartProjectOptionsModal } from '@/pages/Welcome/components'
import { Translate } from '@components/Translate'

const useStyles = makeStyles(({ spacing }) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(5, 6),
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238FD1A9FF' stroke-width='4' stroke-dasharray='12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  },

  header: {
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 600,
    textAlign: 'center',
    paddingBottom: spacing(1),
  },

  subtitle: {
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'center',
    paddingBottom: spacing(2.5),
  },

  button: {
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    textAlign: 'center',
    padding: spacing(2, 3),
    color: '#ffffff',
    backgroundColor: '#1BAC54',
    borderRadius: '12px',

    '&:hover': {
      opacity: 0.8,
      backgroundColor: '#1BAC54',
    },
  },
}))

export const PageContent = () => {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <div className={classes.content}>
        <Typography className={classes.header}>
          <Translate id="WelcomePage.Header" defaultMessage="Welcome!" />
        </Typography>
        <Typography className={classes.subtitle}>
          <Translate id="WelcomePage.Subtitle" defaultMessage="Choose image and start drawing" />
        </Typography>

        <Button className={classes.button} onClick={handleOpen}>
          <Translate id="WelcomePage.StartButton" defaultMessage="Start Project" />
        </Button>

        <StartProjectOptionsModal isModalOpen={isModalOpen} handleClose={handleClose} />
      </div>
    </Box>
  )
}
