export const setSelectionHandlers = (canvas, handler) => {
  canvas.on('selection:created', (event) => handler(event, canvas))
  canvas.on('selection:updated', (event) => handler(event, canvas))
  canvas.on('selection:cleared', (event) => handler(event, canvas))
}
