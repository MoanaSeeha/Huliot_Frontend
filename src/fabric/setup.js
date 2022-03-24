import { fabric as Fabric } from 'fabric'
import { palette } from '@/styles'

export const setupFabric = () => {
  Fabric.Object.prototype.set({
    borderColor: palette.green,
    cornerColor: palette.green,
    cornerSize: 10,
    transparentCorners: false,
    padding: 5,
    borderDashArray: [2, 2],
  })
  Fabric.ActiveSelection.prototype.set({
    hasControls: false,
  })
}
