'use client'

import {
  AmountSortOrder,
  PaymentFilterContextType,
  PaymentStatus,
  PaymentType,
} from '@/lib/types'
import { getCurrentMonth } from '@/utils/dateHelper'
import { createContext, useState } from 'react'

export const PaymentFilterContext = createContext<PaymentFilterContextType>({
  byDate: {
    startMonth: getCurrentMonth(),
    endMonth: getCurrentMonth(),
    setStartMonth: () => {},
    setEndMonth: () => {},
  },
  byAmountSort: {
    amountSortOrder: null,
    setAmountSortOrder: () => {},
  },
  byStatus: {
    status: null,
    setStatus: () => {},
  },
  byPayType: {
    payType: null,
    setPayType: () => {},
  },
  bySearch: {
    search: null,
    setSearch: () => {},
  },
  byMerchantSearch: {
    merchantSearch: null,
    setMerchantSearch: () => {},
  },
})

export default function PaymentFilterContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [startMonth, setStartMonth] = useState(getCurrentMonth())
  const [endMonth, setEndMonth] = useState(getCurrentMonth())
  const [amountSortOrder, setAmountSortOrder] =
    useState<AmountSortOrder | null>(null)
  const [status, setStatus] = useState<PaymentStatus | null>(null)
  const [payType, setPayType] = useState<PaymentType | null>(null)
  const [search, setSearch] = useState<string | null>(null)
  const [merchantSearch, setMerchantSearch] = useState<string | null>(null)

  const paymentFilterCtx: PaymentFilterContextType = {
    byDate: {
      startMonth,
      endMonth,
      setStartMonth,
      setEndMonth,
    },
    byAmountSort: {
      amountSortOrder,
      setAmountSortOrder,
    },
    byStatus: {
      status,
      setStatus,
    },
    byPayType: {
      payType,
      setPayType,
    },
    bySearch: {
      search,
      setSearch,
    },
    byMerchantSearch: {
      merchantSearch,
      setMerchantSearch,
    },
  }

  return (
    <PaymentFilterContext.Provider value={paymentFilterCtx}>
      {children}
    </PaymentFilterContext.Provider>
  )
}
