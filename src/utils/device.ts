import * as Bowser from 'bowser'

export const device = Bowser.parse(window.navigator.userAgent)

export function getDeviceOrientation() {
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
}

interface Position {
  clientX: number
  clientY: number
}
export function getCorrectTouchPosition(source: Position): Position {
  if (getDeviceOrientation() === 'landscape') {
    return source
  } else {
    return {
      clientX: source.clientY,
      clientY: window.innerHeight - source.clientX,
    }
  }
}
