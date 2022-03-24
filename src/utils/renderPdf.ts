import { rgb } from 'pdf-lib'
import { HuliotModel, IconModel, PipeModel } from '@/fabric'
// @ts-ignore
import pathThatSvg from 'path-that-svg/dist/pathThatSvg.umd'

export async function renderLayout(
  pdfDoc: any,
  pdfPage: any,
  model: HuliotModel,
  background: string | null,
) {
  background && (await renderBackground(pdfDoc, pdfPage, background))
  for (const [, pipe] of Object.entries(model.objects.pipes)) renderPipe(pdfPage, pipe)
  for (const [, icon] of Object.entries(model.objects.icons)) await renderIcon(pdfPage, icon)
}

async function renderBackground(doc: any, page: any, background: string) {
  const image = await doc.embedPng(background)
  page.drawImage(image, { x: 0, y: page.getWidth() - image.height })
}

function renderPipe(page: any, pipe: PipeModel) {
  const start = { x: pipe.coords.x1, y: page.getHeight() - pipe.coords.y1 }
  const end = { x: pipe.coords.x2, y: page.getHeight() - pipe.coords.y2 }

  page.drawLine({
    start,
    end,
    thickness: 2,
  })

  const middle = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 }
  page.drawRectangle({
    x: middle.x - 15,
    y: middle.y - 12,
    width: 30,
    height: 24,
    color: rgb(1, 1, 1),
    borderWidth: 1,
  })
  page.moveTo(middle.x - 14, middle.y - 9)
  page.drawText(pipe.label, 8)
}

async function renderIcon(page: any, icon: IconModel) {
  const parser = new DOMParser()
  const pathOnlySvg = await pathThatSvg(icon.svgString)
  const svgElement = parser.parseFromString(pathOnlySvg, 'image/svg+xml')
    .childNodes[0] as HTMLElement

  const width = Number(svgElement.getAttribute('width'))
  const height = Number(svgElement.getAttribute('height'))

  const x = icon.x - width / 2
  const y = page.getHeight() - icon.y + height / 2

  const [viewBoxWidth, viewBoxHeight] = svgElement
    .getAttribute('viewBox')
    ?.split(' ')
    .slice(2)
    .map(Number) || [width, height]

  const scaleX = width / viewBoxWidth
  const scaleY = height / viewBoxHeight

  const paths = Array.from(svgElement.querySelectorAll('path'))
  for (const path of paths) renderSvgPath(page, path, x, y, (scaleX + scaleY) / 2)
}

function renderSvgPath(
  page: any,
  pathElement: SVGPathElement,
  x: number,
  y: number,
  scale: number,
) {
  const path = pathElement.getAttribute('d')
  const borderWidth = Number(pathElement.getAttribute('stroke-width'))
  const border = pathElement.getAttribute('stroke')
  const fill = pathElement.getAttribute('fill')
  const borderLineCap = pathElement.getAttribute('stroke-linecap')

  page.drawSvgPath(path, {
    x,
    y,
    borderWidth,
    scale,
    ...(fill ? { color: hex(fill) } : {}),
    ...(border ? { border: hex(border) } : {}),
    ...(borderLineCap === 'round' ? { borderLineCap: 'Round' } : {}),
  })
}

const hex = (hexValue: string) => {
  const m = hexValue.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i) || ['', '00', '00', '00']
  return rgb(parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255)
}
