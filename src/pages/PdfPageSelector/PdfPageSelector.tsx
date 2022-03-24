import { useEffect, useState, useCallback, ContextType, WheelEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

import { Box, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { darken } from '@mui/material/styles'

import { resetLoading } from '@/store/reducers'
import { useAppDispatch, usePdfHandlers, useStorage, useWindowSize } from '@/hooks'
import { TOP_PANEL_HEIGHT, A4_WIDTH, palette } from '@/styles'
import { readBlobAsArrayBuffer } from '@/utils'
import { RouteNames } from '@/routes'
import { Button } from '@/components/Button'

import { PdfPage } from './PdfPage'

type ScrollContext = ContextType<typeof VisibilityContext>

export const PdfPageSelector = () => {
  const classes = useStyles()
  const { pageToImage, getDocument } = usePdfHandlers()
  const { saveRawBackground } = useStorage()
  const { loadMultipagePdfUrl } = useStorage()
  const dispatch = useAppDispatch()
  const { push } = useHistory()
  const [pdfDocument, setPdfDocument] = useState<any>(null)
  const [pagesCount, setPagesCount] = useState<number>(0)
  const [activePage, setActivePage] = useState<number>(1)
  const [pages, setPages] = useState<Array<number>>([])
  const [, windowHeight] = useWindowSize()
  const renderHeight = windowHeight ? windowHeight - TOP_PANEL_HEIGHT : 0

  const goBack = () => {
    push('/')
  }

  const submitPageSelection = async (selectedPage: number) => {
    // Pdf page is rendered as the image that fits to A4 page with 300dpi resolution
    const pageItem = await pdfDocument.getPage(selectedPage)
    const pageBlob = await pageToImage(pageItem, A4_WIDTH)
    if (pageBlob) {
      const binaryBg = await readBlobAsArrayBuffer(pageBlob)
      await saveRawBackground(binaryBg)
      push(RouteNames.EDIT_BACKGROUND_IMAGE)
    }
  }

  const submit = () => {
    submitPageSelection(activePage)
  }

  useEffect(() => {
    async function onPageLoad() {
      const pdfBlobUrl = loadMultipagePdfUrl()
      if (!pdfBlobUrl) return
      const pdfDocument = await getDocument(pdfBlobUrl)
      const n = pdfDocument.numPages
      setPdfDocument(pdfDocument)
      setPagesCount(n)
      const initialCount = n <= 10 ? n : 10
      setPages(Array.from(Array(initialCount)))
    }

    onPageLoad().then(() => {
      dispatch(resetLoading())
    })
  }, [pagesCount])

  const onUpdate = ({ isLastItemVisible }: ScrollContext) => {
    const visiblePages = pages.length
    if (isLastItemVisible) {
      if (visiblePages < pagesCount) {
        const newPagesCount = pagesCount - visiblePages < 5 ? pagesCount - visiblePages : 5
        const newPages = Array.from(Array(newPagesCount))
        console.log('adding', visiblePages, newPagesCount)
        setPages([...pages, ...newPages])
      }
    }
  }

  const onWheel = useCallback((context: ScrollContext, event: WheelEvent) => {
    const isThouchpad = Math.abs(event.deltaX) !== 0 || Math.abs(event.deltaY) < 15

    if (isThouchpad) {
      event.stopPropagation()
      return
    }

    if (event.deltaY < 0) {
      context.scrollNext()
    } else if (event.deltaY > 0) {
      context.scrollPrev()
    }
  }, [])

  if (!pdfDocument || !renderHeight) return null

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

        <Typography align="center">
          Selected {activePage} of {pagesCount}
        </Typography>

        <Button onClick={submit}>Ok</Button>
      </Box>

      {pagesCount ? (
        <ScrollMenu onScroll={onUpdate} onWheel={onWheel}>
          {pages.map((_, page) => (
            <PdfPage
              key={page}
              pdfDocument={pdfDocument}
              page={page + 1}
              activePage={activePage}
              setActivePage={setActivePage}
              renderHeight={renderHeight}
            />
          ))}
        </ScrollMenu>
      ) : null}
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
    },

    discardButton: {
      backgroundColor: palette.red,

      '&:hover': {
        backgroundColor: darken(palette.red, 0.2),
      },
    },
  }
})
