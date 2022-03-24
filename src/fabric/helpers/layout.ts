import { HuliotCanvas, HuliotIcon, HuliotModel, HuliotPipe } from '@/fabric'

export const restoreLayout = (canvas: HuliotCanvas, layoutModel: HuliotModel) => {
  const { icons, pipes } = layoutModel.objects

  Object.values(icons).forEach((icon) => {
    const iconEl = new HuliotIcon(canvas, {
      existingId: icon.id,
      x: icon.x,
      y: icon.y,
      svgString: icon.svgString,
      subType: icon.subType,
      comment: icon.comment,
      angle: icon.angle,
    })
    canvas.add(iconEl)
  })

  Object.values(pipes).forEach((pipe) => {
    const pipeEl = new HuliotPipe(canvas, {
      existingId: pipe.id,
      ...pipe.coords,
      label: pipe.label,
      comment: pipe.comment,
    })
    canvas.add(pipeEl)
  })
}
