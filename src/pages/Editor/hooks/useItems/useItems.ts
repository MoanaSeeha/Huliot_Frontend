import { constantsItems } from './constantsItems'
import { elementsItems } from './elementsItems'
import { pipesItems } from './pipesItems'

export const useItemList = (toolType: string) => {
  switch (toolType) {
    case 'constants':
      return constantsItems

    case 'elements':
      return elementsItems

    case 'pipes':
      return pipesItems

    default:
      return constantsItems
  }
}

export const useItem = (toolType: string, id: number | string) => {
  switch (toolType) {
    case 'constants':
      return constantsItems.find((item) => item.id === id) || constantsItems[0]

    case 'elements':
      return elementsItems.find((item) => item.id === id) || elementsItems[0]

    case 'pipes':
      return pipesItems.find((item) => item.value === id) || pipesItems[0]

    default:
      return constantsItems[0]
  }
}
