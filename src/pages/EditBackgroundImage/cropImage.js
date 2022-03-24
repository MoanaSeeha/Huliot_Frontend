import { canvasToBlob } from '@/utils'

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export default async function getCroppedImg(imageSrc, crop, rotation) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!rotation) {
    // Simply put the image on canvas of crop size with crop offset
    canvas.width = crop.width
    canvas.height = crop.height

    ctx.drawImage(image, -crop.x, -crop.y)
  } else {
    const rotationRad = (rotation * Math.PI) / 180

    // Calculate dimensions of a box enough to put the rotated image onto it
    const absCosine = Math.abs(Math.cos(rotationRad))
    const absSine = Math.abs(Math.sin(rotationRad))
    const safeWidth = absCosine * image.width + absSine * image.height
    const safeHeight = absSine * image.width + absCosine * image.height

    canvas.width = safeWidth
    canvas.height = safeHeight

    // Make the center of the safe area rotation point
    ctx.translate(safeWidth / 2, safeHeight / 2)
    ctx.rotate(rotationRad)

    // Draw rotated image
    ctx.drawImage(image, -image.width / 2, -image.height / 2)

    // Copy pixels within crop box
    const data = ctx.getImageData(crop.x, crop.y, crop.width, crop.height)

    // Resize canvas to the desired size and clear the context
    canvas.width = crop.width
    canvas.height = crop.height

    // Paste copied pixels
    ctx.putImageData(data, 0, 0)
  }

  return URL.createObjectURL(await canvasToBlob(canvas, 'image/png'))
}
