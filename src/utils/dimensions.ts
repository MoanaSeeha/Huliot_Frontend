export const PIXELS_PER_CM = 60 // 0.1cm => 6px
export const DEFAULT_SCALE = 50 // 1:50

export const MINIMAL_DIMENSION = 0.5 // The drawing cannot represent area less than this value (in meters)
export const MAXIMAL_DIMENSION = 50 // The drawing cannot represent area more than this value (in meters)

// Rounded to mm
export const getSizeInCm = (pixels: number, scale: number = DEFAULT_SCALE, hintK: number = 1) => {
  return Math.round((pixels / PIXELS_PER_CM) * DEFAULT_SCALE * 10) / 10
}

// Rounded to cm
export const getSizeInM = (pixels: number, scale: number = DEFAULT_SCALE, hintK: number = 1) => {
  return Math.round((pixels / PIXELS_PER_CM) * DEFAULT_SCALE) / 100
}
