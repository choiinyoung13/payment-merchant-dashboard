'use client'

import { MerchantFilterContextType } from '@/lib/types'
import { createContext, useState } from 'react'

export const MerchantFilterContext = createContext<MerchantFilterContextType>({
  byStatus: {
    status: null,
    setStatus: () => {},
  },
  bySearch: {
    search: null,
    setSearch: () => {},
  },
})

export default function MerchantFilterContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [status, setStatus] = useState<string | null>(null)
  const [search, setSearch] = useState<string | null>(null)

  const merchantFilterCtx: MerchantFilterContextType = {
    byStatus: {
      status,
      setStatus,
    },
    bySearch: {
      search,
      setSearch,
    },
  }

  return (
    <MerchantFilterContext.Provider value={merchantFilterCtx}>
      {children}
    </MerchantFilterContext.Provider>
  )
}
