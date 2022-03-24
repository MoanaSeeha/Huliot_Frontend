import { HuliotModel } from '@/fabric'

const MODEL_VERSION = 0.1
export const LAYOUT_JSON_NAME = 'layout.json'

export const encodeModel = (model: HuliotModel, background: string | null): string => {
  // Attachment should be Base64 encoded string
  return btoa(
    JSON.stringify({
      version: MODEL_VERSION,
      background,
      ...model,
    }),
  )
}

export const decodeModel = (
  attachments: any,
): { model: HuliotModel; background: string | null } | void => {
  try {
    const content = attachments?.[LAYOUT_JSON_NAME].content
    const string = new TextDecoder().decode(content)
    const instance = JSON.parse(string)
    if (instance.version === MODEL_VERSION && instance.objects.icons && instance.objects.pipes) {
      const model = { objects: instance.objects } as HuliotModel
      return { model, background: instance.background }
    } else {
      return undefined
    }
  } catch (err) {
    return undefined
  }
}
