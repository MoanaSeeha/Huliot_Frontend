import { ThemeOptions } from '@mui/material'
import { palette } from '@/styles/palette'

export const theme: ThemeOptions = {
  palette: {
    primary: {
      main: palette.green,
      contrastText: 'rgba(255,255,255,0.87)',
    },
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'sans-serif'].join(','),
  },
}
