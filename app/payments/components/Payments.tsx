'use client'

import { PaymentListRes, MerchantListRes } from '@/lib/types'
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
  return (
    <>
      <PaymentSort />
      <PaymentTypeStats payments={payments} merchants={merchants} />
      <PaymentSummaryCards payments={payments} merchants={merchants} />
      <PaymentsTable payments={payments} merchants={merchants} />
    </>
  )
}
