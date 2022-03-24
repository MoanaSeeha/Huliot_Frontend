import { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Spinner: FC = () => {
  return (
    <Box
      position="fixed"
      width="100%"
      height="100%"
      sx={{
        background: 'rgba(200, 200, 200, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}
    >
      <CircularProgress />
    </Box>
  )
}
