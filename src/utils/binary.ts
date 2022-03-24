export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary_string = window.atob(base64)
  const len = binary_string.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes.buffer
}

export function readBlobAsArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    reader.onload = function () {
      resolve(reader.result as ArrayBuffer)
    }
  })
}

export async function urlToBlob(url: string): Promise<Blob> {
  const fetchResult = await fetch(url)
  return fetchResult.blob()
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type?: string,
  quality?: any,
): Promise<Blob | null> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob: Blob | null) => resolve(blob), type, quality),
  )
}

const downloadURL = (url: string, fileName: string) => {
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.style.display = 'none'
  a.click()
  a.remove()
}

export function downloadBlob(data: ArrayBuffer, fileName: string, mimeType: string) {
  const blob = new Blob([data], {
    type: mimeType,
  })

  const url = window.URL.createObjectURL(blob)

  downloadURL(url, fileName)

  setTimeout(() => window.URL.revokeObjectURL(url), 1000)
}
