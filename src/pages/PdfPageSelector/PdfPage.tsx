import { useLayoutEffect, useState } from 'react'
import cn from 'classnames'
import makeStyles from '@mui/styles/makeStyles'
import { Box, CircularProgress } from '@mui/material'

import { useImageBlob, usePdfHandlers } from '@/hooks'
import { palette } from '@/styles'

type Props = {
  page: number
  pdfDocument: any
  activePage: number
  setActivePage: any
  renderHeight: number
}

export const PdfPage = ({ page, pdfDocument, activePage, setActivePage, renderHeight }: Props) => {
  const styles = useStyles()
  const { pageToImage } = usePdfHandlers()
  const [pageImage, setPageImageBlob] = useImageBlob()
  const [isRendering, setIsRendering] = useState(true)

  useLayoutEffect(() => {
    async function renderThumbnail() {
      const pdfPage = await pdfDocument.getPage(page)
      const pdfPageBlob = await pageToImage(pdfPage, renderHeight - 34) // 20 + 10 px of margins + 4 px of borders
      setPageImageBlob(pdfPageBlob)
      setIsRendering(false)
    }

    renderThumbnail()
  }, [])

  return !isRendering ? (
    <div
      className={cn(styles.page, { [styles.activePage]: activePage === page })}
      onClick={() => setActivePage(page)}
    >
      <img src={pageImage || ''} alt="pdfPage" />
      <div className={styles.pageNumber}>{page}</div>
    </div>
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width={160}>
      <CircularProgress />
    </Box>
  )
}

const useStyles = makeStyles(() => {
  return {
    page: {
      cursor: 'pointer',
      border: '2px black solid',
      margin: '10px 5px 20px',
      position: 'relative',
    },

    pageNumber: {
      color: palette.white,
      backgroundColor: palette.grey,
      display: 'inline-box',
      position: 'absolute',
      bottom: 5,
      right: 5,
      padding: 3,
    },

    activePage: {
      border: '2px solid lightgreen',
    },
  }
})
