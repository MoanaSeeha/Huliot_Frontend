import React, { FC, useState, useEffect } from 'react'
import LineTo from 'react-lineto'
import { useContainerSize, useDraggable } from '@/hooks'
import { TOP_PANEL_HEIGHT, palette } from '@/styles'
import { makeStyles } from '@mui/styles'

const DRAG_AREA = 30 // The area around the hinter point available for dragging
const DRAG_PADDING = DRAG_AREA / 2 - 5 // Additional padding allowing drag points to be close to the borders (up to 5px)

type Props = {
  touched: boolean
  setTouched: (touched: boolean) => void
  setMeasuredLength: (length: number) => void
}
export const HinterPoints: FC<Props> = ({ touched, setTouched, setMeasuredLength }) => {
  const [ref, width, height] = useContainerSize()
  const [rectLimits, setRectLimits] = useState({ top: 0, bottom: 0, left: 0, right: 0 })

  const [[startX, startY]] = useState<[number, number]>([DRAG_AREA, DRAG_AREA])
  const [[endX, endY], setEndPos] = useState<[number, number]>([width - DRAG_AREA, DRAG_AREA])

  useEffect(() => {
    setEndPos([width - DRAG_AREA, DRAG_AREA])
    // @TODO: the rectLimits should be set differently for portrait mode, but that require the correct container height
    // that is wrong now.
    setRectLimits({
      top: TOP_PANEL_HEIGHT - DRAG_PADDING,
      bottom: height + TOP_PANEL_HEIGHT + DRAG_PADDING,
      left: 0 - DRAG_PADDING,
      right: width + DRAG_PADDING,
    })
  }, [width, height])

  // @ts-ignore
  const {
    targetRef: startCircleRef,
    delta: deltaStart,
    dragging: draggingStart,
    // @ts-ignore
  } = useDraggable({ controlStyle: true, rectLimits })
  const {
    targetRef: endCircleRef,
    delta: deltaEnd,
    dragging: draggingEnd,
    // @ts-ignore
  } = useDraggable({ controlStyle: true, rectLimits })

  const isDragging = draggingStart || draggingEnd

  useEffect(() => {
    if (isDragging && !touched) {
      setTouched(true)
    }
    const sx = startX + deltaStart.x
    const sy = startY + deltaStart.y
    const ex = endX + deltaEnd.x
    const ey = endY + deltaEnd.y

    setMeasuredLength(Math.hypot(ex - sx, ey - sy)) // Simple Pythagorean equation
  }, [isDragging, touched, deltaStart, deltaEnd]) // Update the measured length while any of the points is moving

  const styles = useStyles()
  return (
    <div className={styles.container} ref={ref}>
      <LineTo from="start" to="end" borderColor={palette.green} borderStyle="dashed" />
      <Circle left={startX} top={startY} dragRef={startCircleRef} className="start" />
      <Circle left={endX} top={endY} dragRef={endCircleRef} className="end" />
    </div>
  )
}

type CircleProps = {
  left: number
  top: number
  dragRef?: any
  className: string
}

const Circle: FC<CircleProps> = ({ left, top, dragRef, className }) => (
  <svg
    className={className}
    ref={dragRef}
    viewBox="0 0 120 120"
    fill={palette.red}
    style={{
      pointerEvents: 'auto', // Points themselves should accept mouse events in order to move
      position: 'absolute',
      left: left - DRAG_AREA / 2,
      top: top - DRAG_AREA / 2,
      width: DRAG_AREA,
      height: DRAG_AREA,
    }}
  >
    <circle cx={60} cy={60} r={20} />
  </svg>
)

const useStyles = makeStyles(() => {
  return {
    container: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100vw',
      height: `calc(100vh - ${TOP_PANEL_HEIGHT}px)`,
      pointerEvents: 'none', // The hinter points container should pass mouse events to the react-easy crop under it
      '@media only screen and (orientation:portrait)': {
        width: `calc(100vh - ${TOP_PANEL_HEIGHT}px)`,
        height: `100vh`, // @TODO: the height is calculated wrong in Chrome mobile, non-fixable
      },
    },
  }
})
