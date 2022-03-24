import { useState, useLayoutEffect } from 'react'
// @ts-ignore
import { getOrientation } from 'o9n'

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      if (['landscape', 'landscape-primary'].includes(getOrientation().type)) {
        setSize([window.innerWidth, window.innerHeight])
      } else {
        setSize([window.innerHeight, window.innerWidth])
      }
    }

    window.addEventListener('resize', updateSize)

    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
