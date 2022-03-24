export const stopPropagation = (handler: any) => (event: Event) => {
  event.stopPropagation()

  handler && handler(event)
}
