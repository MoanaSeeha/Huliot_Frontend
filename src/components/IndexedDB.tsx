import { ReactNode } from 'react'
import { IndexedDB as ReactIndexedDB, initDB as reactInitDB } from 'react-indexed-db'

type Props = {
  children: ReactNode
}

const objectStoresMeta = [
  {
    store: 'rawBackground',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [{ name: 'data', keypath: 'data', options: { unique: false } }],
  },
  {
    store: 'background',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [{ name: 'data', keypath: 'data', options: { unique: false } }],
  },
]
const dbConfig = {
  name: 'HuliotDB',
  version: 2,
  objectStoresMeta,
}

export const IndexedDB = ({ children }: Props) => {
  return (
    <ReactIndexedDB
      name={dbConfig.name}
      version={dbConfig.version}
      objectStoresMeta={objectStoresMeta}
    >
      {children}
    </ReactIndexedDB>
  )
}

export const initDB = () => {
  reactInitDB(dbConfig)
}
