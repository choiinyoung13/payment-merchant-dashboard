'use client'

import { PaymentListRes, MerchantListRes } from '@/lib/types'
import { useEffect, useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import { getCurrentMonth } from '@/utils/dateHelper'
import PaymentsTable from './PaymentsTable'
import PaymentSort from './sort/PaymentSort'
import PaymentSummaryCards from './PaymentSummaryCards'
import PaymentTypeStats from './PaymentTypeStats'

export default function Payments({
  payments,
  merchants,
}: {
  payments: PaymentListRes[]
  merchants: MerchantListRes[]
}) {
  const {
    byDate: { setStartMonth, setEndMonth },
  } = useContext(PaymentFilterContext)

  // 페이지 진입 시 날짜 초기화
  useEffect(() => {
    const currentMonth = getCurrentMonth()
    setStartMonth(currentMonth)
    setEndMonth(currentMonth)
  }, [setStartMonth, setEndMonth])

  return (
    <>
      <PaymentSort />
      <PaymentTypeStats payments={payments} merchants={merchants} />
      <PaymentSummaryCards payments={payments} merchants={merchants} />
      <PaymentsTable payments={payments} merchants={merchants} />
    </>
  )
}
