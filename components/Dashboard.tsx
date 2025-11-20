'use client'

import { PaymentListRes, MerchantListRes } from '@/lib/types'
import { useContext, useEffect } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import { getCurrentMonth } from '@/utils/dateHelper'
import {
  formatDisplay,
  getFilteredPayments,
} from '@/app/payments/utils/paymentHelper'
import { getTotalAmount } from '@/utils/aggregation'
import SummaryCard from '@/components/SummaryCard'
import PaymentTypeStats from '@/app/payments/components/PaymentTypeStats'
import MerchantStatusStats from '@/app/merchants/components/MerchantStatusStats'
import MonthDatePicker from '@/app/payments/components/MonthDatePicker'
import Link from 'next/link'
import { getMerchantName } from '@/utils/dateHelper'
import RecentPaymentItem from '@/components/RecentPaymentItem'
import {
  getPaymentStatusCounts,
  getTopMerchantsByAmount,
  getTopMerchantsByCount,
  getRecentPayments,
  getActiveMerchantCount,
  getTopBizType,
  getTopBrand,
} from '@/utils/aggregation'

export default function Dashboard({
  payments = [],
  merchants = [],
}: {
  payments?: PaymentListRes[]
  merchants?: MerchantListRes[]
}) {
  const {
    byDate: { startMonth, endMonth, setStartMonth, setEndMonth },
    byStatus: { status },
    byPayType: { payType },
    byAmountSort: { amountSortOrder },
    bySearch: { search },
    byMerchantSearch: { merchantSearch },
  } = useContext(PaymentFilterContext)

  // 페이지 진입 시 날짜 초기화
  useEffect(() => {
    const currentMonth = getCurrentMonth()
    setStartMonth(currentMonth)
    setEndMonth(currentMonth)
  }, [setStartMonth, setEndMonth])

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

  // 상태별 집계
  const statusCounts = getPaymentStatusCounts(filteredPayments)

  // Top 가맹점 (금액 기준)
  const topMerchantsByAmount = getTopMerchantsByAmount(
    filteredPayments,
    merchants,
    5
  ).map(item => ({
    ...item,
    name: getMerchantName(item.code, merchants),
  }))

  // Top 가맹점 (건수 기준)
  const topMerchantsByCount = getTopMerchantsByCount(
    filteredPayments,
    merchants,
    5
  ).map(item => ({
    ...item,
    name: getMerchantName(item.code, merchants),
  }))

  // 최근 거래 내역 (최근 5건)
  const recentPayments = getRecentPayments(filteredPayments, 5)

  // 가맹점 현황
  const activeMerchants = getActiveMerchantCount(merchants)
  const totalMerchants = merchants.length

  // 최다 업종
  const topBizType = getTopBizType(merchants)

  // 최다 브랜드
  const topBrand = getTopBrand(merchants)

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* 상단 주요 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 min-[390px]:gap-6">
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
          headerAction={<MonthDatePicker variant="icon-only" />}
          footer={
            startMonth && endMonth ? (
              <div className="text-gray-500 text-xs">
                {formatDisplay(startMonth, endMonth)}
              </div>
            ) : undefined
          }
        />
        <SummaryCard
          title="최다 브랜드"
          value={topBrand ? topBrand[0] : '-'}
          valueSize="small"
          footer={
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">가맹점 수</span>
              <span className="text-[#425aeb] bg-[#425aeb]/10 rounded px-2 py-0.5 text-xs">
                {topBrand ? `${topBrand[1]}개` : '-'}
              </span>
            </div>
          }
        />
        <SummaryCard
          title="활성 가맹점"
          value={activeMerchants}
          footer={
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">전체</span>
              <span className="text-[#425aeb] bg-[#425aeb]/10 rounded px-2 py-0.5 text-xs">
                {totalMerchants}개
              </span>
            </div>
          }
        />
        <SummaryCard
          title="최다 업종"
          value={topBizType ? topBizType[0] : '-'}
          valueSize="small"
          footer={
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">가맹점 수</span>
              <span className="text-[#425aeb] bg-[#425aeb]/10 rounded px-2 py-0.5 text-xs">
                {topBizType ? `${topBizType[1]}개` : '-'}
              </span>
            </div>
          }
        />
      </div>

      {/* 결제 수단별 통계 */}
      <PaymentTypeStats payments={payments} merchants={merchants} />

      {/* 최근 거래 내역 & Top 가맹점 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-[390px]:gap-8">
        {/* 최근 거래 내역 */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 min-[390px]:p-4 min-[540px]:p-6">
          <div className="flex items-center justify-between mb-4 min-[390px]:mb-6">
            <h3 className="text-xs min-[390px]:text-sm min-[540px]:text-[0.9375rem] font-semibold text-gray-700">
              최근 거래 내역
            </h3>
            <Link
              href="/payments"
              className="text-xs min-[390px]:text-sm text-[#425aeb] hover:underline"
            >
              전체 보기
            </Link>
          </div>
          {recentPayments.length > 0 ? (
            <div className="space-y-2">
              {recentPayments.map(payment => (
                <RecentPaymentItem
                  key={payment.paymentCode}
                  payment={payment}
                  merchants={merchants}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              거래 내역이 없습니다.
            </div>
          )}
        </div>

        {/* Top 가맹점 (금액 기준) */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 min-[390px]:p-4 min-[540px]:p-6">
          <h3 className="text-xs min-[390px]:text-sm min-[540px]:text-[0.9375rem] font-semibold text-gray-700 mb-4 min-[390px]:mb-6">
            Top 가맹점 (거래 금액)
          </h3>
          {topMerchantsByAmount.length > 0 ? (
            <div className="space-y-2">
              {topMerchantsByAmount.map((merchant, index) => (
                <div
                  key={merchant.code}
                  className="flex items-center justify-between p-2.5 min-[390px]:p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-[390px]:gap-3 flex-1 min-w-0">
                    <div className="w-5 h-5 min-[390px]:w-6 min-[390px]:h-6 rounded-full bg-[#425aeb] text-white flex items-center justify-center text-[10px] min-[390px]:text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs min-[390px]:text-sm font-medium text-gray-900 truncate">
                        {merchant.name}
                      </div>
                      <div className="text-[10px] min-[390px]:text-xs text-gray-500">
                        {merchant.count}건
                      </div>
                    </div>
                  </div>
                  <div className="text-xs min-[390px]:text-sm font-semibold text-[#425aeb] ml-2">
                    {merchant.amount.toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              가맹점 데이터가 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* 가맹점 현황 통계 */}
      <MerchantStatusStats merchants={merchants} />
    </div>
  )
}
