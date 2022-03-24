export const fitIcon = (widthK: number, heightK: number, svg: string): string => {
  const widthRegex = /(<svg.+width=")(\d+)([\s\S]+)/m
  const heightRegex = /(<svg.+height=")(\d+)([\s\S]+)/m
  const swRegex = /(stroke-width=")(\d+)(")/gm

  const longerSide = widthK > heightK ? widthK : heightK

  return svg
    .replace(widthRegex, (_, before, width, after) => {
      return before + String(longerSide + after)
    })
    .replace(heightRegex, (_, before, height, after) => {
      return before + String(longerSide + after)
    })
    .replace(swRegex, (_, before, sw, after) => {
      return before + String(sw) + after
    })
}
