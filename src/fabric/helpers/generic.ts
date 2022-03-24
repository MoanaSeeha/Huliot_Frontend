import { HuliotCanvas, HuliotObject } from '@/fabric'

export function findObjectBySingleId(canvas: HuliotCanvas, objectId: string): HuliotObject | null {
  return canvas.getObjects().find((obj: HuliotObject) => obj.huliotProps?.id === objectId) || null
}

export function findObjectsByMultipleIds(
  canvas: HuliotCanvas,
  objectIds: string[],
): HuliotObject[] {
  return canvas
    .getObjects()
    .filter(
      ({ huliotProps }: HuliotObject) => huliotProps?.id && objectIds.includes(huliotProps.id),
    )
}

export function findObjectsByType(canvas: HuliotCanvas, types: ('pipe' | 'icon')[]) {
  return canvas.getObjects().filter(
    // @ts-ignore
    ({ huliotProps }: HuliotObject) => huliotProps?.type && types.includes(huliotProps.type),
  )
}
