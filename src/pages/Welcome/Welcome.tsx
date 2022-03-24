import { FC } from 'react'
import { Navbar } from '@/components'

import { PageContent } from './components'

export const Welcome: FC = () => {
  return (
    <>
      <Navbar />

      <PageContent />
    </>
  )
}
