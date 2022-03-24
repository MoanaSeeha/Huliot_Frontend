import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'

import { theme } from '@/styles/theme'
import { AppRouter, IndexedDB, initDB, Spinner } from '@/components'

import './App.css'
import { selectLoadingState } from '@/store/reducers'
import { useAppSelector } from '@/hooks'

initDB()

export const App: FC = () => {
  const loading = useAppSelector(selectLoadingState)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme)}>
        <BrowserRouter>
          <IndexedDB>
            <AppRouter />
            {loading && <Spinner />}
          </IndexedDB>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
