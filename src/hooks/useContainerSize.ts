import { useRef, useState, useLayoutEffect, RefObject } from 'react'

export const useContainerSize = (): [RefObject<HTMLDivElement>, number, number] => {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<[number, number]>([0, 0])

  useLayoutEffect(() => {
    function updateSize() {
      if (ref.current && ref.current.offsetWidth >= window.innerWidth) {
        setSize([ref.current.offsetWidth, ref.current.offsetHeight])
      } else {
        const originalW =
          window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight
        const originalH =
          window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
        const proportion = (originalW - 150) / originalW
        const scaleW = originalW * proportion
        const scaleH = originalH * proportion
        setSize([scaleW, scaleH])
      }
    }

    window.addEventListener('resize', updateSize)

    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return [ref, ...size]
}
