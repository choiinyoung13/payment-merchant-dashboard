'use client'

import { PaymentListRes, MerchantListRes } from '@/lib/types'
import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import { getFilteredPayments } from '../utils/paymentHelper'
import SummaryCard from '@/components/SummaryCard'
import {
  getPaymentStatusCounts,
  getTopMerchantByAmount,
  getTotalAmount,
} from '@/utils/aggregation'

export default function PaymentSummaryCards({
  payments = [],
  merchants = [],
}: {
  payments?: PaymentListRes[]
  merchants?: MerchantListRes[]
}) {
  const {
    byDate: { startMonth, endMonth },
    byStatus: { status },
    byPayType: { payType },
    byAmountSort: { amountSortOrder },
    bySearch: { search },
    byMerchantSearch: { merchantSearch },
  } = useContext(PaymentFilterContext)

  const filteredPayments = getFilteredPayments(
    payments,
    startMonth,
    endMonth,
    status,
    payType,
    amountSortOrder,
    search,
    merchantSearch,
    merchants
  )

  const statusCounts = getPaymentStatusCounts(filteredPayments)

  const { merchant: topMerchant, amount: topMerchantAmount } =
    getTopMerchantByAmount(filteredPayments, merchants)

  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4 min-[390px]:gap-6">
      <SummaryCard
        title="총 거래 건수"
        value={filteredPayments.length}
        footer={
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#425aeb] bg-[#425aeb]/10 rounded px-2 py-0.5 text-xs">
              완료 {statusCounts.SUCCESS}
            </span>
            <span className="text-rose-600 bg-rose-50 rounded px-2 py-0.5 text-xs">
              실패 {statusCounts.FAILED}
            </span>
            <span className="text-gray-700 bg-gray-100 rounded px-2 py-0.5 text-xs">
              취소 {statusCounts.CANCELLED}
            </span>
          </div>
        }
      />

      <SummaryCard
        title="총 거래액"
        value={`${getTotalAmount(filteredPayments).toLocaleString()}원`}
      />

      <SummaryCard
        title="최다 거래액 가맹점"
        value={topMerchant ? topMerchant.mchtName : '-'}
        valueSize="small"
        footer={
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">총 거래액</span>
            <span className="text-[#425aeb] bg-[#425aeb]/10 rounded px-2 py-0.5 text-xs">
              {topMerchantAmount > 0
                ? `${topMerchantAmount.toLocaleString()}원`
                : '-'}
            </span>
          </div>
        }
      />
    </div>
  )
}
