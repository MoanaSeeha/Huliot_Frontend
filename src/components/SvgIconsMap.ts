import { DEFAULT_SCALE, PIXELS_PER_CM, fitIcon } from '@/utils'

const mainColor = '#000000'
const bgColor = '#ffffff'
const bgShape = `<path d="M0 4C0 1.79086 1.79086 0 4 0H32C34.2091 0 36 1.79086 36 4V32C36 34.2091 34.2091 36 32 36H4C1.79086 36 0 34.2091 0 32V4Z" fill="${bgColor}"/>`
// const bgShape = ''

export const showerIcon = `
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${bgShape}
    <path d="M21.5 6C19.8512 6.00214 18.2647 6.63005 17.0611 7.75685C15.8575 8.88365 15.1264 10.4253 15.0157 12.0704C13.6911 12.261 12.4486 12.8264 11.4346 13.6998C10.4206 14.5732 9.67739 15.7182 9.2926 17H22.7074C22.3244 15.7242 21.5863 14.5837 20.5793 13.7118C19.5723 12.8398 18.338 12.2724 17.0206 12.0757C17.1311 10.9254 17.68 9.86163 18.5534 9.10491C19.4269 8.3482 20.558 7.95653 21.7124 8.01107C22.8667 8.06561 23.9559 8.56218 24.7541 9.39788C25.5523 10.2336 25.9984 11.3443 26 12.5V30H28V12.5C27.998 10.7767 27.3126 9.12452 26.094 7.90596C24.8755 6.6874 23.2233 6.00195 21.5 6V6Z" fill="${mainColor}"/>
    <path d="M8 18H24V20H8V18Z" fill="${mainColor}"/>
    <path d="M16 29C16.5523 29 17 28.5523 17 28C17 27.4477 16.5523 27 16 27C15.4477 27 15 27.4477 15 28C15 28.5523 15.4477 29 16 29Z" fill="${mainColor}"/>
    <path d="M16 26C16.5523 26 17 25.5523 17 25C17 24.4477 16.5523 24 16 24C15.4477 24 15 24.4477 15 25C15 25.5523 15.4477 26 16 26Z" fill="${mainColor}"/>
    <path d="M20 29C20.5523 29 21 28.5523 21 28C21 27.4477 20.5523 27 20 27C19.4477 27 19 27.4477 19 28C19 28.5523 19.4477 29 20 29Z" fill="${mainColor}"/>
    <path d="M20 26C20.5523 26 21 25.5523 21 25C21 24.4477 20.5523 24 20 24C19.4477 24 19 24.4477 19 25C19 25.5523 19.4477 26 20 26Z" fill="${mainColor}"/>
    <path d="M12 29C12.5523 29 13 28.5523 13 28C13 27.4477 12.5523 27 12 27C11.4477 27 11 27.4477 11 28C11 28.5523 11.4477 29 12 29Z" fill="${mainColor}"/>
    <path d="M12 26C12.5523 26 13 25.5523 13 25C13 24.4477 12.5523 24 12 24C11.4477 24 11 24.4477 11 25C11 25.5523 11.4477 26 12 26Z" fill="${mainColor}"/>
    <path d="M16 23C16.5523 23 17 22.5523 17 22C17 21.4477 16.5523 21 16 21C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23Z" fill="${mainColor}"/>
    <path d="M20 23C20.5523 23 21 22.5523 21 22C21 21.4477 20.5523 21 20 21C19.4477 21 19 21.4477 19 22C19 22.5523 19.4477 23 20 23Z" fill="${mainColor}"/>
    <path d="M12 23C12.5523 23 13 22.5523 13 22C13 21.4477 12.5523 21 12 21C11.4477 21 11 21.4477 11 22C11 22.5523 11.4477 23 12 23Z" fill="${mainColor}"/>
  </svg>
`

// [width, height] in CM
const elementsDimensions = {
  showerSquare: [80, 80],
  sinkIcon: [45, 35],
  bathIcon: [170, 70],
  washingMachineIcon: [60, 60],
  refrigeratorIcon: [85, 85],
  gardenTapIcon: [5, 5],
  acDrainIcon: [5, 5],
  toiletIcon: [55, 36],
  kitchenSinkIcon: [76, 50],
  urinalIcon: [40, 30],
  bidetIcon: [55, 36],
  trapIcon: [9.83, 9.83],
  collectorIcon: [9.83, 9.83],
  branchIcon: [13.7, 16, 5],
  trapWithTextIcon: [11.83, 11.83],
}

// 1.6 x 1.6cm => 96 x 96
export const showerSquareIcon = fitIcon(
  (elementsDimensions.showerSquare[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.showerSquare[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24">
    <rect width="22" height="22" x="1" y="1" stroke="${mainColor}" fill="${bgColor}" stroke-width="0.5" rx="3"/>
    <circle cx="5.5" cy="18.5" r="1" fill="${mainColor}" />
    <path stroke="${mainColor}" fill="${bgColor}" stroke-linecap="round" stroke-width="0.5" d="M6 13V5M9.177 14.52l6-6M11 18h8"/>
  </svg>
`,
)

// 1.36 x 0.64cm => 74.8 x 35.2
export const sinkIcon = fitIcon(
  (elementsDimensions.sinkIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.sinkIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="28" height="20" viewBox="0 0 28 20">
    <rect width="26" height="18" x="1" y="1" stroke="${mainColor}" stroke-width="1" rx="3" fill="${bgColor}"/>
    <path stroke="${mainColor}" fill="${bgColor}" stroke-width="1" d="M7 10a5 5 0 0 1 5-5h4a5 5 0 0 1 0 10h-4a5 5 0 0 1-5-5Z"/>
    <circle cx="14" cy="11" r="1" fill="${mainColor}"/>
    <path fill="${mainColor}" d="M13.5 1h1v7h-1z"/>
  </svg>
`,
)

// 1.2 x 1.2cm => 72 x 72
export const washingMachineIcon = fitIcon(
  (elementsDimensions.washingMachineIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.washingMachineIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24">
    <rect width="22" height="22" x="1" y="1" stroke="${mainColor}" stroke-width="0.6" fill="${bgColor}" rx="3"/>
    <path stroke="${mainColor}" stroke-linecap="round" stroke-width="0.6" d="m2.5 22 19-20m-19 0 19 20"/>
  </svg>
`,
)

// 3.4 x 1.6 cm => 204 x 96
export const bathIcon = fitIcon(
  (elementsDimensions.bathIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.bathIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="28" height="20" viewBox="0 0 28 20">
    <rect width="26" height="18" x="1" y="1" stroke="${mainColor}" fill="${bgColor}" stroke-width="0.25" rx="3"/>
    <path stroke="${mainColor}" stroke-width="0.25" d="M4 6a1 1 0 0 1 1-1h15a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H5a1 1 0 0 1-1-1V6Z" fill="${bgColor}"/>
    <circle cx="9" cy="10" r="0.5" fill="${mainColor}"/>
    <path fill="${mainColor}" d="M1 10.25V9.75h5v0.5z"/>
  </svg>
`,
)

// 1.4 x 1.4 cm => 84 x 84
export const refrigeratorIcon = fitIcon(
  (elementsDimensions.refrigeratorIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.refrigeratorIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="26" height="23" viewBox="0 0 26 23">
    <rect width="24" height="14" x="1" y="2" stroke="${mainColor}" stroke-width="0.5" fill="${bgColor}" rx="3"/>
    <rect width="22" height="4" x="2" y="16" stroke="${mainColor}" stroke-width="0.5" fill="${bgColor}" rx="2"/>
    <path fill="${mainColor}" d="M18 20h5v1h-5z"/>
  </svg>
`,
)

// 0.3 x 0.3 cm => 18 x 18
export const gardenTapIcon = fitIcon(
  (elementsDimensions.gardenTapIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.gardenTapIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none">
    <path fill="${mainColor}" d="M.507 9.55h20.985v1.9H.507z"/>
    <path fill="${mainColor}" d="M9.551 21.492V.507h1.9v20.985z"/>
  </svg>
`,
)

// 1.36 x 0.64cm => 81.6 x 38.4
export const kitchenSinkIcon = fitIcon(
  (elementsDimensions.kitchenSinkIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.kitchenSinkIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="28" height="20" viewBox="0 0 28 20">
    <rect width="26" height="18" x="1" y="1" stroke="${mainColor}" fill="${bgColor}" stroke-width="0.5" rx="3"/>
    <path stroke="${mainColor}" stroke-width="0.5" d="M5 5h18v10H5V5Z" fill="${bgColor}" />
    <circle cx="14" cy="11" r="1" fill="${mainColor}"/>
    <path fill="${mainColor}" d="M13.5 1h1v7h-1z"/>
  </svg>
`,
)

export const acDrainIcon = fitIcon(
  (elementsDimensions.acDrainIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.acDrainIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="8" stroke="${mainColor}" fill="${bgColor}" stroke-width="2"/>
  </svg>
`,
)

// 1.36 x 0.64cm => 75
export const urinalIcon = fitIcon(
  (elementsDimensions.urinalIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.urinalIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="22" height="29" viewBox="0 0 22 29">
    <path stroke="${mainColor}" fill="${bgColor}"  stroke-width="1.25" d="M21 20.36c0 4-4.24 7.64-10 7.64S1 24.37 1 20.36c0-2.2 1.25-4.27 3.38-5.71a2.32 2.32 0 0 0 1.27-1.37c.23-.57.34-1.26.4-1.95.07-.65.1-1.38.13-2.12v-.15c.03-.8.07-1.61.14-2.41.16-1.63.48-3.05 1.17-4.06C8.12 1.67 9.14 1 11 1c1.86 0 2.82.67 3.4 1.57.64 1 .9 2.41 1.02 4.05.05.7.07 1.4.09 2.09v.34c.03.8.06 1.59.15 2.3.08.7.22 1.42.53 2.01.3.58.76 1.08 1.46 1.3 2.1 1.44 3.35 3.5 3.35 5.7Z"/>
    <circle cx="11" cy="20" r="1.5" fill="${mainColor}"/>
  </svg>
`,
)

// 1.36 x 0.64cm => 75
export const bidetIcon = fitIcon(
  (elementsDimensions.bidetIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.bidetIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="24" viewBox="0 0 20 24">
    <path stroke="${mainColor}" fill="${bgColor}" stroke-width="0.75" d="M1 10a9 9 0 0 1 18 0v13H1V10Z"/>
    <path stroke="${mainColor}" fill="${bgColor}" stroke-width="0.75" d="M6 10a4 4 0 1 1 8 0v6H6v-6Z"/>
    <circle cx="5.5" cy="19.5" r="0.75" fill="${mainColor}" />
    <circle cx="14.5" cy="19.5" r="0.75" fill="${mainColor}" />
  </svg>
`,
)

// 1.36 x 0.64cm => 75
export const toiletIcon = fitIcon(
  (elementsDimensions.toiletIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.toiletIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="28" height="26" viewBox="0 0 28 26">
    <rect width="26" height="8" x="1" y="16.5" stroke="${mainColor}" fill="${bgColor}" stroke-width="0.75" rx="2"/>
    <path stroke="${mainColor}" fill="${bgColor}" stroke-width="0.75" d="M5 10a9 9 0 0 1 18 0v6H5v-6Z"/>
    <path stroke="${mainColor}" fill="${bgColor}" stroke-width="0.75" d="M10 9a4 4 0 0 1 8 0v3h-8V9Z"/>
  </svg>
`,
)

// 0.2 x 0.2cm => 11
export const trapIconOutlined = fitIcon(
  (elementsDimensions.trapIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.trapIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="22" height="22" viewBox="0 0 22 22">
    <circle cx="11" cy="11" r="10" stroke="${mainColor}" fill="${bgColor}" stroke-width="2"/>
    <path stroke="${mainColor}" fill="${bgColor}" stroke-width="2" d="m3 4 15 14M3 18 18 4"/>
  </svg>
`,
)

// 0.2 x 0.2cm => 11
export const collectorIconOutlined = fitIcon(
  (elementsDimensions.collectorIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.collectorIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="22" height="22" viewBox="0 0 22 22">
    <circle cx="11" cy="11" r="10" stroke="${mainColor}" fill="${bgColor}" stroke-width="2"/>
    <circle cx="7" cy="11" r="2" fill="${mainColor}"/>
    <circle cx="15" cy="11" r="2" fill="${mainColor}"/>
  </svg>
`,
)

// 0.3 x 0.3cm => 18
export const highTrapIcon1 = fitIcon(
  (elementsDimensions.trapWithTextIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.trapWithTextIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="25" viewBox="0 0 24 25">
    <circle cx="15" cy="16" r="8" stroke="${mainColor}" fill="${bgColor}" stroke-width="2"/>
    <path stroke="${mainColor}" stroke-width="2" d="m9 10 12 12M9 22l12-12"/>
    <path fill="${mainColor}" d="M4.2.9v3.67c0 .22.03.43.1.63l.2.6A21.5 21.5 0 0 1 5.2 8h-1.1a12.75 12.75 0 0 0-.47-1.49l-.17-.44a53.87 53.87 0 0 0-.85.97l-.2.21c-.25.25-.51.45-.8.61-.28.16-.6.27-.97.32A21.62 21.62 0 0 1 .4 7.14a8.49 8.49 0 0 0 .78-.27 2.22 2.22 0 0 0 .65-.54L3.06 5V1.94H1.5V.9h2.7Z"/>
  </svg>
`,
)

// 0.3 x 0.3cm => 18
export const highTrapIcon2 = fitIcon(
  (elementsDimensions.trapWithTextIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.trapWithTextIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="25" height="25" viewBox="0 0 25 25">
    <circle cx="16" cy="16" r="8" stroke="${mainColor}" fill="${bgColor}" stroke-width="2"/>
    <path stroke="${mainColor}" stroke-width="2" d="m10 10 12 12m-12 0 12-12"/>
    <path fill="${mainColor}" d="M2.23 1.07a14.6 14.6 0 0 1-.75-.03 3.03 3.03 0 0 1-.7-.18 14.9 14.9 0 0 0 .27-.72A4.77 4.77 0 0 0 2.06.3h3.1a2.75 2.75 0 0 1 .1.43 3.32 3.32 0 0 1 .04.67v.7a5.22 5.22 0 0 1-.1.9 1.88 1.88 0 0 1-.45.8A37.58 37.58 0 0 1 3.3 5.4l-.67-.6.56-.57a53.15 53.15 0 0 0 .85-.92 1.46 1.46 0 0 0 .33-.65 8.11 8.11 0 0 0 .03-1.58H2.23ZM.92 3.59v-.38a9.53 9.53 0 0 1 .05-.65l.07-.33a16.88 16.88 0 0 1 .87.12 57.62 57.62 0 0 1-.1.6 7.21 7.21 0 0 0-.01.66V7H.92V3.6ZM6.4 5.5a319.45 319.45 0 0 1 .58-3.4c.02-.16.02-.3 0-.41a1.02 1.02 0 0 0-.08-.33c-.04-.11-.1-.23-.19-.34l-.3-.46a11.96 11.96 0 0 0 .54-.3C7 .2 7.1.14 7.19.1a9.74 9.74 0 0 1 .57.9l.4-.33A2.3 2.3 0 0 1 9 .26c.15-.04.32-.06.5-.06.45 0 .82.11 1.12.34.3.23.5.57.6 1.04l.05.5a11.31 11.31 0 0 1 .03 1.21v.51a36.68 36.68 0 0 1-.06 1.4l-.03.24H8.7V4.7h1.7a17.12 17.12 0 0 0 0-2.3 4.73 4.73 0 0 0-.07-.62 1.75 1.75 0 0 0-.11-.33.76.76 0 0 0-.45-.41 1 1 0 0 0-.36-.06c-.15 0-.3.02-.43.07-.14.04-.27.1-.4.18a5.9 5.9 0 0 0-.7.58 389.63 389.63 0 0 1-.6 3.69H6.4Z"/>
  </svg>
`,
)

// 0.3 x 0.3cm => 18
export const highTrapIcon3 = fitIcon(
  (elementsDimensions.trapWithTextIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.trapWithTextIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="27" height="25" viewBox="0 0 27 25">
    <circle cx="18" cy="16" r="8" stroke="${mainColor}" fill="${bgColor}" stroke-width="2"/>
    <path stroke="${mainColor}" stroke-width="2" d="m12 10 12 12m-12 0 12-12"/>
    <path fill="${mainColor}" d="M3.6.31c.3 0 .58.04.8.12.23.07.42.19.57.34.1.11.18.24.24.4.07.15.12.31.15.48A6.67 6.67 0 0 1 5.4 3.5a2.9 2.9 0 0 1-.24.88 1.95 1.95 0 0 1-1.14 1.05c-.26.1-.54.14-.86.14-.4 0-.75-.06-1.04-.19a1.88 1.88 0 0 1-1.09-1.3 3.68 3.68 0 0 1-.08-1.59 3.72 3.72 0 0 1 .49-1.42 3.34 3.34 0 0 1-.92-.2A14.68 14.68 0 0 0 .77.14 4.97 4.97 0 0 0 1.82.3h1.77Zm-1.27.76c-.15.22-.27.45-.35.7-.08.26-.13.51-.15.76l-.02.3v.3c0 .22.01.43.05.63s.11.38.22.53c.1.16.25.3.43.38.18.1.4.14.64.14.18 0 .34-.03.5-.08a1.27 1.27 0 0 0 .7-.63c.06-.16.11-.33.14-.53a12.35 12.35 0 0 0 .06-.78 4.58 4.58 0 0 0-.18-1.33.54.54 0 0 0-.18-.23.68.68 0 0 0-.3-.13 2.17 2.17 0 0 0-.45-.03h-1.1Zm5.92 0a15.26 15.26 0 0 1-.76-.03 3.17 3.17 0 0 1-.71-.18 14.7 14.7 0 0 0 .26-.72A4.97 4.97 0 0 0 8.08.3h3.16a2.68 2.68 0 0 1 .1.43 3.27 3.27 0 0 1 .05.67v.7c0 .16 0 .32-.02.47a2.2 2.2 0 0 1-.25.84 2.2 2.2 0 0 1-.29.4 37.58 37.58 0 0 1-1.48 1.57l-.69-.6.58-.57a54.47 54.47 0 0 0 .87-.92c.1-.1.17-.21.22-.32a1.5 1.5 0 0 0 .16-.7 7.85 7.85 0 0 0-.01-1.21H8.25ZM6.91 3.59v-.38a9.32 9.32 0 0 1 .06-.65l.07-.33a17.63 17.63 0 0 1 .89.12 55.96 55.96 0 0 1-.1.6 7.05 7.05 0 0 0-.02.66V7h-.9V3.6Zm5.61 1.9.15-.85.12-.65a25.31 25.31 0 0 0 .16-.94 15.12 15.12 0 0 0 .16-.96c.02-.16.02-.3 0-.41a1 1 0 0 0-.08-.33 1.8 1.8 0 0 0-.2-.34c-.07-.13-.18-.28-.3-.46a12.55 12.55 0 0 0 .55-.3l.25-.15a9.81 9.81 0 0 1 .58.9c.14-.12.28-.24.41-.33a2.37 2.37 0 0 1 .86-.41c.15-.04.32-.06.51-.06.46 0 .84.11 1.14.34.3.23.51.57.61 1.04a11.1 11.1 0 0 1 .09 1.71v.51a35.65 35.65 0 0 1-.06 1.4l-.04.24h-2.56V4.7h1.74a24.41 24.41 0 0 0 .01-2.3 4.66 4.66 0 0 0-.07-.62 1.72 1.72 0 0 0-.12-.33.78.78 0 0 0-.46-.41c-.1-.04-.22-.06-.36-.06-.16 0-.3.02-.44.07a2.52 2.52 0 0 0-.77.45c-.12.1-.23.2-.34.32a361.17 361.17 0 0 1-.63 3.68h-.9Z"/>
  </svg>
`,
)

// 0.3 x 0.3cm => 18
export const highTrapIcon4 = fitIcon(
  (elementsDimensions.trapWithTextIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.trapWithTextIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="27" height="25" viewBox="0 0 27 25">
    <circle cx="18" cy="16" r="8" stroke="${mainColor}" fill="${bgColor}" stroke-width="2"/>
    <path stroke="${mainColor}" stroke-width="2" d="m12 10 12 12m-12 0 12-12"/>
    <path fill="${mainColor}" d="M3.35.3c.29 0 .54.04.75.11.21.07.39.18.53.34.1.1.17.23.23.38a3.73 3.73 0 0 1 .2.98 6.66 6.66 0 0 1-.03 1.25c-.04.32-.11.6-.23.85a1.8 1.8 0 0 1-1.06 1.01c-.24.1-.5.14-.8.14-.37 0-.7-.06-.96-.18-.27-.13-.48-.3-.65-.5a2.1 2.1 0 0 1-.37-.76 3.67 3.67 0 0 1-.08-1.53 3.7 3.7 0 0 1 .46-1.37A3.03 3.03 0 0 1 .48.83a14.49 14.49 0 0 0 .25-.7 4.5 4.5 0 0 0 .96.17H3.35Zm-1.18.73a2.5 2.5 0 0 0-.33.68c-.07.25-.12.49-.13.73l-.02.29V3c0 .22 0 .42.04.62.04.19.1.36.2.5.1.16.24.29.41.38.17.08.37.13.6.13.16 0 .31-.03.46-.08.14-.05.26-.13.37-.23.1-.1.2-.23.27-.38s.12-.32.14-.5a12.33 12.33 0 0 0 .06-.76 4.57 4.57 0 0 0-.17-1.29.52.52 0 0 0-.17-.22.62.62 0 0 0-.27-.11 1.96 1.96 0 0 0-.42-.04H2.17Zm5.3 0a13.74 13.74 0 0 1-.7-.03A2.86 2.86 0 0 1 6.1.83a14.46 14.46 0 0 0 .25-.7A4.5 4.5 0 0 0 7.3.3H8.15c.2 0 .4.03.6.07.2.04.38.13.54.25.15.13.28.3.37.52.1.22.15.5.15.84v3.27h-.83V2.07c0-.2-.02-.36-.05-.5a.67.67 0 0 0-.15-.31.61.61 0 0 0-.3-.18A1.83 1.83 0 0 0 8 1.03h-.53Zm3.47 4.26.14-.82.11-.62a25.11 25.11 0 0 0 .23-1.34l.08-.5v-.4a1 1 0 0 0-.08-.31c-.04-.1-.1-.22-.18-.33a62.5 62.5 0 0 1-.29-.44 11.34 11.34 0 0 0 .51-.3L11.7.1a9.36 9.36 0 0 1 .55.87l.38-.33a2.2 2.2 0 0 1 .8-.4c.14-.03.3-.05.47-.05.43 0 .78.11 1.07.33.28.22.47.55.56 1a11.06 11.06 0 0 1 .08 1.65v.5A35.21 35.21 0 0 1 15.56 5l-.03.24h-2.38v-.72h1.62a19.79 19.79 0 0 0-.06-2.82 1.7 1.7 0 0 0-.11-.32.72.72 0 0 0-.43-.4.94.94 0 0 0-.34-.06c-.14 0-.28.02-.41.07a2.36 2.36 0 0 0-.72.44l-.31.3a338.87 338.87 0 0 1-.6 3.55h-.84Z"/>
  </svg>
`,
)

// 0.3 x 0.3cm => 18
export const highTrapIcon5 = fitIcon(
  (elementsDimensions.trapWithTextIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.trapWithTextIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="25" height="25" viewBox="0 0 25 25">
    <circle cx="16" cy="16" r="8" stroke="${mainColor}" fill="${bgColor}" stroke-width="2"/>
    <path stroke="${mainColor}" stroke-width="2" d="m10 10 12 12m-12 0 12-12"/>
    <path fill="${mainColor}" d="M.3 8h1.2V4.51h4V8h1.2V0H5.5v3.48h-4V0H.3v8Z"/>
  </svg>
`,
)

export const pipe32Icon = fitIcon(
  (elementsDimensions.trapWithTextIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.trapWithTextIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="23" height="28" viewBox="0 0 23 28">
    <path fill="${mainColor}" d="M11.46 21.08h.87c.44 0 .79-.11 1.04-.34.26-.22.39-.54.39-.96 0-.4-.11-.72-.33-.95-.2-.22-.53-.34-.97-.34-.38 0-.7.12-.94.34-.25.22-.37.5-.37.86H9.72c0-.44.12-.84.35-1.2.23-.36.56-.63.97-.83.42-.2.89-.3 1.4-.3.85 0 1.52.2 2 .64.5.42.74 1.02.74 1.78 0 .38-.12.74-.37 1.08-.24.34-.56.6-.94.76.47.16.82.42 1.06.76.25.34.37.75.37 1.23 0 .77-.26 1.37-.79 1.83-.52.45-1.21.68-2.07.68-.82 0-1.49-.22-2.01-.66a2.16 2.16 0 0 1-.79-1.75h1.43c0 .38.12.68.37.92.26.23.6.35 1.02.35.44 0 .79-.12 1.04-.35.26-.24.38-.58.38-1.02 0-.45-.13-.8-.4-1.04-.26-.24-.65-.36-1.18-.36h-.84v-1.13ZM22.37 26h-5.73v-.98l2.84-3.1a7 7 0 0 0 .87-1.14c.18-.3.27-.62.27-.93 0-.4-.12-.73-.35-.98a1.18 1.18 0 0 0-.92-.38c-.46 0-.82.14-1.07.43-.25.28-.38.66-.38 1.15h-1.43c0-.52.12-.99.36-1.4.23-.42.57-.74 1.01-.97.44-.23.95-.35 1.52-.35.83 0 1.48.21 1.96.63.48.41.72.99.72 1.72 0 .43-.12.87-.36 1.34-.24.47-.63 1-1.18 1.6l-2.09 2.22h3.96V26Z"/>
    <path stroke="${mainColor}" stroke-width="3" d="M2 27.5V12.66a4 4 0 0 1 1.17-2.83L11.5 1.5"/>
  </svg>
`,
)

export const pipe40Icon = fitIcon(
  (elementsDimensions.branchIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.branchIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="23" height="28" viewBox="0 0 23 28">
    <path fill="${mainColor}" d="M14.63 22.96h1.07v1.14h-1.07V26h-1.42v-1.9H9.53l-.05-.87 3.68-5.76h1.47v5.49Zm-3.65 0h2.23V19.4l-.1.18-2.13 3.38Zm11.22-.55c0 1.22-.23 2.15-.7 2.78-.45.62-1.15.93-2.08.93-.93 0-1.62-.3-2.09-.91-.46-.61-.7-1.51-.71-2.7v-1.48c0-1.23.22-2.15.68-2.76.46-.61 1.16-.92 2.1-.92.94 0 1.63.3 2.09.9.46.6.7 1.49.7 2.68v1.48Zm-1.42-1.6c0-.8-.11-1.38-.33-1.75-.22-.38-.57-.57-1.05-.57-.46 0-.8.18-1.02.54-.22.35-.34.9-.35 1.65v1.93c0 .8.11 1.4.34 1.78.22.4.57.59 1.05.59.45 0 .8-.18 1.01-.54.22-.36.33-.93.35-1.7v-1.93Z"/>
    <path stroke="${mainColor}" stroke-width="3" d="M2 27.5V12.66a4 4 0 0 1 1.17-2.83L11.5 1.5"/>
  </svg>
`,
)

export const pipe50Icon = fitIcon(
  (elementsDimensions.branchIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.branchIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="23" height="28" viewBox="0 0 23 28">
    <path fill="${mainColor}" d="m10.2 22.77.46-4.3h4.58v1.23h-3.4l-.23 2.04c.4-.23.84-.34 1.34-.34.81 0 1.44.26 1.89.78.45.52.68 1.22.68 2.1 0 .86-.25 1.55-.75 2.07-.5.51-1.19.77-2.06.77-.78 0-1.43-.22-1.94-.66a2.42 2.42 0 0 1-.83-1.76h1.37c.06.41.2.73.45.95.24.22.56.33.95.33.43 0 .77-.16 1.02-.47.24-.31.37-.74.37-1.28 0-.52-.14-.93-.4-1.23a1.4 1.4 0 0 0-1.12-.45c-.26 0-.48.03-.66.1-.18.07-.37.2-.58.4l-1.14-.28Zm12 .64c0 1.22-.23 2.15-.7 2.78-.45.62-1.15.93-2.08.93-.93 0-1.62-.3-2.09-.91-.46-.61-.7-1.51-.71-2.7v-1.48c0-1.23.22-2.15.68-2.76.46-.61 1.16-.92 2.1-.92.94 0 1.63.3 2.09.9.46.6.7 1.49.7 2.68v1.48Zm-1.42-1.6c0-.8-.11-1.38-.33-1.75-.22-.38-.57-.57-1.05-.57-.46 0-.8.18-1.02.54-.22.35-.34.9-.35 1.65v1.93c0 .8.11 1.4.34 1.78.22.4.57.59 1.05.59.45 0 .8-.18 1.01-.54.22-.36.33-.93.35-1.7v-1.93Z"/>
    <path stroke="${mainColor}" stroke-width="3" d="M2 27.5V12.66a4 4 0 0 1 1.17-2.83L11.5 1.5"/>
  </svg>
`,
)
export const pipe63Icon = fitIcon(
  (elementsDimensions.branchIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.branchIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="23" height="28" viewBox="0 0 23 28">
    <path fill="${mainColor}" d="M14.25 18.43v1.18h-.18c-.8 0-1.43.23-1.9.65a2.75 2.75 0 0 0-.86 1.81 2.31 2.31 0 0 1 1.75-.72c.76 0 1.35.27 1.79.8.43.53.65 1.22.65 2.06 0 .86-.25 1.57-.77 2.1-.5.54-1.17.8-2 .8-.85 0-1.54-.3-2.07-.94a3.72 3.72 0 0 1-.8-2.47v-.49c0-1.5.37-2.66 1.1-3.51.73-.85 1.77-1.27 3.14-1.27h.15Zm-1.53 4.07a1.55 1.55 0 0 0-1.43.97v.43c0 .63.13 1.14.4 1.51.26.37.6.56 1.03.56.42 0 .75-.16 1-.48.25-.31.37-.73.37-1.24a2 2 0 0 0-.38-1.26 1.2 1.2 0 0 0-1-.49Zm5.57-.42h.86c.44 0 .79-.11 1.04-.34.26-.22.39-.54.39-.96 0-.4-.11-.72-.33-.95-.2-.22-.53-.34-.97-.34-.38 0-.7.12-.94.34-.25.22-.37.5-.37.86h-1.43c0-.44.12-.84.35-1.2.23-.36.56-.63.97-.83.42-.2.89-.3 1.4-.3.86 0 1.52.2 2 .64.5.42.74 1.02.74 1.78 0 .38-.12.74-.37 1.08-.24.34-.56.6-.94.76.47.16.82.42 1.06.76.25.34.37.75.37 1.23 0 .77-.26 1.37-.79 1.83-.52.45-1.21.68-2.07.68-.82 0-1.49-.22-2.01-.66a2.16 2.16 0 0 1-.79-1.75h1.43c0 .38.12.68.37.92.26.23.6.35 1.02.35.44 0 .79-.12 1.04-.35.26-.24.39-.58.39-1.02 0-.45-.14-.8-.4-1.04-.27-.24-.66-.36-1.19-.36h-.83v-1.13Z"/>
    <path stroke="${mainColor}" stroke-width="3" d="M2 27.5V12.66a4 4 0 0 1 1.17-2.83L11.5 1.5"/>
  </svg>
`,
)

export const branch32Icon = fitIcon(
  (elementsDimensions.branchIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.branchIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="22" height="26" viewBox="0 0 22 26">
    <path fill="${mainColor}" d="m9.2 20.77.46-4.3h4.58v1.23h-3.4l-.23 2.04c.4-.23.84-.34 1.34-.34.81 0 1.44.26 1.89.78.45.52.68 1.22.68 2.1 0 .86-.25 1.55-.75 2.07-.5.51-1.19.77-2.06.77-.78 0-1.43-.22-1.94-.66a2.42 2.42 0 0 1-.83-1.76h1.37c.06.41.2.73.45.95.24.22.56.33.95.33.43 0 .77-.16 1.02-.47.24-.31.37-.74.37-1.28 0-.52-.14-.93-.4-1.23a1.4 1.4 0 0 0-1.12-.45c-.26 0-.48.03-.66.1-.18.07-.37.2-.58.4l-1.14-.28Zm12 .64c0 1.22-.23 2.15-.7 2.78-.45.62-1.15.93-2.08.93-.93 0-1.62-.3-2.09-.91-.46-.61-.7-1.51-.71-2.7v-1.48c0-1.23.22-2.15.68-2.76.46-.61 1.16-.92 2.1-.92.94 0 1.63.3 2.09.9.46.6.7 1.49.7 2.68v1.48Zm-1.42-1.6c0-.8-.11-1.38-.33-1.75-.22-.38-.57-.57-1.05-.57-.46 0-.8.18-1.02.54-.22.35-.34.9-.35 1.65v1.93c0 .8.11 1.4.34 1.78.22.4.57.59 1.05.59.45 0 .8-.18 1.01-.54.22-.36.33-.93.35-1.7v-1.93Z"/>
    <path stroke="${mainColor}" stroke-width="3" d="M2 26V13.25M2 0v13.25m0 0 8.75-8.75"/>
  </svg>
`,
)

export const branch40Icon = fitIcon(
  (elementsDimensions.branchIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.branchIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="22" height="26" viewBox="0 0 22 26">
    <path fill="${mainColor}" d="M13.63 21.96h1.07v1.14h-1.07V25h-1.42v-1.9H8.53l-.05-.87 3.68-5.76h1.47v5.49Zm-3.65 0h2.23V18.4l-.1.18-2.13 3.38Zm11.22-.55c0 1.22-.23 2.15-.7 2.78-.45.62-1.15.93-2.08.93-.93 0-1.62-.3-2.09-.91-.46-.61-.7-1.51-.71-2.7v-1.48c0-1.23.22-2.15.68-2.76.46-.61 1.16-.92 2.1-.92.94 0 1.63.3 2.09.9.46.6.7 1.49.7 2.68v1.48Zm-1.42-1.6c0-.8-.11-1.38-.33-1.75-.22-.38-.57-.57-1.05-.57-.46 0-.8.18-1.02.54-.22.35-.34.9-.35 1.65v1.93c0 .8.11 1.4.34 1.78.22.4.57.59 1.05.59.45 0 .8-.18 1.01-.54.22-.36.33-.93.35-1.7v-1.93Z"/>
    <path stroke="${mainColor}" stroke-width="3" d="M2 26V13.25M2 0v13.25m0 0 8.75-8.75"/>
  </svg>
`,
)

export const branch50Icon = fitIcon(
  (elementsDimensions.branchIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.branchIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="22" height="26" viewBox="0 0 22 26">
    <path fill="${mainColor}" d="m9.2 20.77.46-4.3h4.58v1.23h-3.4l-.23 2.04c.4-.23.84-.34 1.34-.34.81 0 1.44.26 1.89.78.45.52.68 1.22.68 2.1 0 .86-.25 1.55-.75 2.07-.5.51-1.19.77-2.06.77-.78 0-1.43-.22-1.94-.66a2.42 2.42 0 0 1-.83-1.76h1.37c.06.41.2.73.45.95.24.22.56.33.95.33.43 0 .77-.16 1.02-.47.24-.31.37-.74.37-1.28 0-.52-.14-.93-.4-1.23a1.4 1.4 0 0 0-1.12-.45c-.26 0-.48.03-.66.1-.18.07-.37.2-.58.4l-1.14-.28Zm12 .64c0 1.22-.23 2.15-.7 2.78-.45.62-1.15.93-2.08.93-.93 0-1.62-.3-2.09-.91-.46-.61-.7-1.51-.71-2.7v-1.48c0-1.23.22-2.15.68-2.76.46-.61 1.16-.92 2.1-.92.94 0 1.63.3 2.09.9.46.6.7 1.49.7 2.68v1.48Zm-1.42-1.6c0-.8-.11-1.38-.33-1.75-.22-.38-.57-.57-1.05-.57-.46 0-.8.18-1.02.54-.22.35-.34.9-.35 1.65v1.93c0 .8.11 1.4.34 1.78.22.4.57.59 1.05.59.45 0 .8-.18 1.01-.54.22-.36.33-.93.35-1.7v-1.93Z"/>
    <path stroke="${mainColor}" stroke-width="3" d="M2 26V13.25M2 0v13.25m0 0 8.75-8.75"/>
  </svg>
`,
)

export const branch63Icon = fitIcon(
  (elementsDimensions.branchIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.branchIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="22" height="26" viewBox="0 0 22 26">
    <path fill="${mainColor}" d="M13.25 16.43v1.18h-.18c-.8 0-1.43.23-1.9.65a2.75 2.75 0 0 0-.86 1.81 2.31 2.31 0 0 1 1.75-.72c.76 0 1.35.27 1.79.8.43.53.65 1.22.65 2.06 0 .86-.25 1.57-.77 2.1-.5.54-1.17.8-2 .8-.85 0-1.54-.3-2.07-.94a3.72 3.72 0 0 1-.8-2.47v-.49c0-1.5.37-2.66 1.1-3.51.73-.85 1.77-1.27 3.14-1.27h.15Zm-1.53 4.07a1.55 1.55 0 0 0-1.43.97v.43c0 .63.13 1.14.4 1.51.26.37.6.56 1.03.56.42 0 .75-.16 1-.48.25-.31.37-.73.37-1.24a2 2 0 0 0-.38-1.26 1.2 1.2 0 0 0-1-.49Zm5.57-.42h.86c.44 0 .79-.11 1.04-.34.26-.22.39-.54.39-.96 0-.4-.11-.72-.33-.95-.2-.22-.53-.34-.97-.34-.38 0-.7.12-.94.34-.25.22-.37.5-.37.86h-1.43c0-.44.12-.84.35-1.2.23-.36.56-.63.97-.83.42-.2.89-.3 1.4-.3.86 0 1.52.2 2 .64.5.42.74 1.02.74 1.78 0 .38-.12.74-.37 1.08-.24.34-.56.6-.94.76.47.16.82.42 1.06.76.25.34.37.75.37 1.23 0 .77-.26 1.37-.79 1.83-.52.45-1.21.68-2.07.68-.82 0-1.49-.22-2.01-.66a2.16 2.16 0 0 1-.79-1.75h1.43c0 .38.12.68.37.92.26.23.6.35 1.02.35.44 0 .79-.12 1.04-.35.26-.24.39-.58.39-1.02 0-.45-.14-.8-.4-1.04-.27-.24-.66-.36-1.19-.36h-.83v-1.13Z"/>
    <path stroke="${mainColor}" stroke-width="3" d="M2 26V13.25M2 0v13.25m0 0 8.75-8.75"/>
  </svg>
`,
)

export const branch63to50Icon = fitIcon(
  (elementsDimensions.branchIcon[0] * PIXELS_PER_CM) / DEFAULT_SCALE,
  (elementsDimensions.branchIcon[1] * PIXELS_PER_CM) / DEFAULT_SCALE,
  `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 26">
    <path fill="${mainColor}" d="M9.3 17.57v.88h-.14c-.6.01-1.08.18-1.43.5-.36.32-.57.77-.64 1.35.34-.36.78-.54 1.31-.54.57 0 1.01.2 1.34.6.33.4.5.91.5 1.54 0 .65-.2 1.18-.58 1.59-.39.4-.89.6-1.5.6-.65 0-1.16-.24-1.56-.71-.4-.47-.6-1.09-.6-1.85v-.37c0-1.12.28-2 .82-2.64.55-.63 1.34-.95 2.36-.95h.11Zm-1.16 3.05a1.16 1.16 0 0 0-1.07.73v.33c0 .47.1.85.3 1.13.2.28.46.42.77.42a.9.9 0 0 0 .76-.36c.18-.24.27-.55.27-.94 0-.38-.1-.7-.28-.94a.9.9 0 0 0-.75-.36Zm4.18-.3h.65c.33-.01.59-.1.78-.26.19-.17.29-.41.29-.73 0-.3-.08-.54-.24-.7-.16-.17-.4-.26-.73-.26-.3 0-.53.08-.71.25a.82.82 0 0 0-.28.65h-1.07c0-.33.09-.63.26-.9.18-.27.42-.48.73-.63.32-.15.67-.23 1.05-.23.64 0 1.14.16 1.5.49.37.32.55.76.55 1.33 0 .29-.09.56-.27.82-.18.25-.42.44-.7.57.34.12.6.3.79.56.19.26.28.57.28.93 0 .57-.2 1.03-.6 1.37-.39.34-.9.5-1.55.5-.61 0-1.12-.16-1.5-.48-.4-.33-.6-.77-.6-1.31h1.07c0 .28.1.5.28.68.2.18.45.27.77.27.33 0 .59-.1.78-.27.19-.17.28-.43.28-.76 0-.34-.1-.6-.3-.78-.2-.18-.49-.27-.88-.27h-.63v-.85Zm4.25 4.23h-.84l2.52-6.95h.84l-2.52 6.95Zm3.47-3.72.35-3.23h3.44v.92h-2.55l-.18 1.53c.3-.17.63-.25 1-.25.61 0 1.09.2 1.42.58.34.4.51.92.51 1.58 0 .65-.18 1.17-.56 1.55-.37.39-.89.58-1.54.58-.59 0-1.07-.17-1.46-.5-.38-.33-.6-.77-.62-1.32h1.03c.04.31.15.55.33.72.18.16.42.25.72.25.32 0 .58-.12.76-.36.18-.23.28-.55.28-.95 0-.4-.1-.7-.3-.93-.2-.23-.49-.34-.84-.34-.2 0-.36.03-.5.08-.13.05-.27.15-.43.3l-.86-.21Zm9 .48c0 .92-.17 1.61-.51 2.08-.35.46-.87.7-1.57.7-.7 0-1.22-.23-1.57-.68a3.36 3.36 0 0 1-.53-2.03v-1.1c0-.93.17-1.62.51-2.08.35-.46.87-.69 1.58-.69.7 0 1.22.23 1.56.68.35.44.53 1.12.53 2v1.12Zm-1.06-1.2c0-.6-.09-1.04-.25-1.32s-.42-.42-.78-.42c-.35 0-.6.13-.77.4-.16.26-.25.68-.26 1.24v1.45c0 .6.08 1.04.25 1.34.17.29.43.44.79.44.34 0 .6-.14.76-.4.16-.28.25-.7.26-1.28V20.1Z"/>
    <path stroke="${mainColor}" stroke-width="3" d="M2 26V13.25M2 0v13.25m0 0 8.75-8.75"/>
  </svg>
`,
)
