import { TOP_PANEL_HEIGHT } from '@/styles'
import { useEffect } from 'react'
import { device, getDeviceOrientation } from '@/utils'

export const useCanvasResize = (myRef, canvas) => {
  useEffect(() => {
    const handleResize = () => {
      const width = myRef.current.offsetWidth
      let height = myRef.current.offsetHeight

      // Chrome for Android sets wrong container height after the orientation change, so we should calculate
      // it manually by taking the window width (for portrait) or height (for landscape) and subtracting the tools
      // panel height
      if (device.platform.type === 'mobile' && device.browser.name === 'Chrome') {
        const portrait = getDeviceOrientation() === 'portrait'
        height = (portrait ? window.innerWidth : window.innerHeight) - TOP_PANEL_HEIGHT
      }

      // @TODO: Chrome for iOS does even worse, sporadically keeping the pre-rotation window.innerHeight value
      // after rotation takes place, so we need to implement initial value caching (or some calculated value based
      // on screen height).

      if (canvas) {
        canvas.setWidth(width)
        canvas.setHeight(height)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [myRef, canvas])
}
