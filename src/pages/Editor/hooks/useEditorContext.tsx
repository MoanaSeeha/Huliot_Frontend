import { ReactNode, createContext, useContext, useState, useMemo } from 'react'

import { HuliotCanvas } from '@/fabric'

type MaybeCanvas = HuliotCanvas | null

interface EditorContext {
  canvas: MaybeCanvas
  setCanvas: (canvas: MaybeCanvas) => void
}

const context = createContext<EditorContext>({
  canvas: null,
  setCanvas: (canvas: MaybeCanvas) => {},
})

export const useEditorContext = () => {
  return useContext(context)
}

export const EditorContextProvider = ({ children }: { children: ReactNode }) => {
  const [canvas, setCanvas] = useState<MaybeCanvas>(null)

  const value = useMemo(
    () => ({
      canvas,
      setCanvas,
    }),
    [canvas],
  )

  return <context.Provider value={value}>{children}</context.Provider>
}
