import { fabric } from 'fabric'
import { AppDispatch } from '@/store'

export type HuliotObjectType = 'icon' | 'pipe' | 'pipeTip' | 'pipeLabel'
export type HuliotIconSubtype = 'constant' | 'element'

export interface HuliotProps {
  id?: string
  pipeId?: string
  type: HuliotObjectType
  comment?: string
}

export interface PipeCoords {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface IconModel {
  id: string
  x: number
  y: number
  subType: HuliotIconSubtype
  svgString: string
  angle: number
  comment?: string
}

export interface PipeModel {
  id: string
  coords: PipeCoords
  label: string
  comment?: string
}

export interface HuliotModel {
  objects: {
    icons: { [id: string]: IconModel }
    pipes: { [id: string]: PipeModel }
  }
  hintK: number // Special coefficient calculated during the hinting procedure to match the given scale (currently 1:50)
}

export class HuliotCanvas extends fabric.Canvas {
  reduxDispatch: AppDispatch

  constructor(element: HTMLCanvasElement | string | null, dispatch: AppDispatch) {
    super(element, defaultOptions)
    this.reduxDispatch = dispatch
  }
}

export class HuliotObject extends fabric.Object {
  huliotProps?: HuliotProps
}

export class HuliotGroup extends fabric.Group {
  huliotProps?: HuliotProps
}

const defaultOptions = {
  allowTouchScrolling: true,
  preserveObjectStacking: true,
}
