'use client'

import { PaymentListRes, MerchantListRes } from '@/lib/types'
import { useContext, ReactNode } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import { getFilteredPayments, getTotalAmount } from '../utils/paymentHelper'

type SummaryCardProps = {
  title: string
  value: string | number
  valueSize?: 'default' | 'small'
  footer?: ReactNode
}

function SummaryCard({
  title,
  value,
  valueSize = 'default',
  footer,
}: SummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-4 flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <span className="text-gray-700 text-xs min-[540px]:text-[0.9375rem] font-semibold">
          {title}
        </span>
        <span className="text-gray-400 text-xs min-[540px]:text-sm">ⓘ</span>
      </div>
      <div
        className={`
          text-xl min-[540px]:text-1xl md:text-2xl
          text-gray-900 mt-1 font-bold${
            valueSize === 'small' ? ' truncate' : ''
          }
        `}
      >
        {value}
      </div>
      {footer && <div className="mt-2">{footer}</div>}
    </div>
  )
}

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

  const statusCounts = {
    SUCCESS: filteredPayments.filter(p => p.status === 'SUCCESS').length,
    FAILED: filteredPayments.filter(p => p.status === 'FAILED').length,
    CANCELLED: filteredPayments.filter(p => p.status === 'CANCELLED').length,
  }

  // 가맹점별 결제 금액 총합 계산
  const merchantAmounts = filteredPayments.reduce((acc, payment) => {
    const amount = parseFloat(payment.amount)
    if (!acc[payment.mchtCode]) {
      acc[payment.mchtCode] = 0
    }
    acc[payment.mchtCode] += amount
    return acc
  }, {} as Record<string, number>)

  // 가장 높은 금액의 가맹점 찾기
  const topMerchantCode = Object.entries(merchantAmounts).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0]

  const topMerchant = topMerchantCode
    ? merchants.find(m => m.mchtCode === topMerchantCode)
    : null

  const topMerchantAmount = topMerchantCode
    ? merchantAmounts[topMerchantCode]
    : 0

  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
