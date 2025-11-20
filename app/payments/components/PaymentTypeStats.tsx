'use client'

import { PaymentListRes, MerchantListRes } from '@/lib/types'
import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import { getFilteredPayments } from '../utils/paymentHelper'

type PayTypeInfo = {
  label: string
  bgColor: string
}

const PAY_TYPE_INFO: Record<string, PayTypeInfo> = {
  DEVICE: {
    label: 'DEVICE',
    bgColor: 'bg-[#1e2875]',
  },
  MOBILE: {
    label: 'MOBILE',
    bgColor: 'bg-[#3045b8]',
  },
  ONLINE: {
    label: 'ONLINE',
    bgColor: 'bg-[#425aeb]',
  },
  BILLING: {
    label: 'BILLING',
    bgColor: 'bg-[#8b98f5]',
  },
  VACT: {
    label: 'VACT',
    bgColor: 'bg-[#d1d8fc]',
  },
}

export default function PaymentTypeStats({
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

  // 결제 수단별 집계
  const payTypeCounts = filteredPayments.reduce((acc, payment) => {
    acc[payment.payType] = (acc[payment.payType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalCount = filteredPayments.length

  const colorOrder = ['DEVICE', 'MOBILE', 'ONLINE', 'BILLING', 'VACT']

  // 비율 계산 및 정렬
  const payTypeStats = Object.entries(payTypeCounts)
    .map(([type, count]) => ({
      type,
      count,
      percentage: totalCount > 0 ? (count / totalCount) * 100 : 0,
      info: PAY_TYPE_INFO[type] || {
        label: type,
        bgColor: 'bg-gray-400',
      },
    }))
    .sort((a, b) => colorOrder.indexOf(a.type) - colorOrder.indexOf(b.type))

  if (totalCount === 0) {
    return null
  }

  return (
    <div className="mb-8 bg-white border border-gray-200 rounded-xl shadow-sm p-3 min-[390px]:p-4 min-[540px]:p-6">
      <div className="flex items-center gap-1 mb-3 min-[390px]:mb-4 min-[540px]:mb-6">
        <h3 className="text-xs min-[390px]:text-sm min-[540px]:text-[0.9375rem] font-semibold text-gray-700">
          결제 수단별 통계
        </h3>
        <span className="text-gray-400 text-[0.625rem] pb-1 min-[390px]:text-xs min-[540px]:text-sm">
          ⓘ
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="mb-4 min-[390px]:mb-5 min-[540px]:mb-7">
        <div className="flex h-4 min-[540px]:h-9 md:h-10 rounded-full overflow-hidden bg-gray-100 shadow-inner">
          {payTypeStats.map((stat, index) => (
            <div
              key={stat.type}
              className={`${stat.info.bgColor}  flex items-center justify-center border-r-2 min-[540px]:border-r-4 border-white last:border-r-0`}
              style={{ width: `${stat.percentage}%` }}
            >
              <span
                className={`
    ${
      stat.percentage <= 4
        ? 'hidden'
        : stat.percentage < 10
        ? 'hidden min-[940px]:inline'
        : 'hidden min-[540px]:inline'
    }
    text-sm font-bold text-white
  `}
              >
                {stat.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[1024px]:grid-cols-3 xl:grid-cols-5 gap-2 min-[390px]:gap-3 min-[540px]:gap-5">
        {payTypeStats.map(stat => (
          <div
            key={stat.type}
            className="flex flex-col gap-2.5 min-[540px]:gap-3 p-4 min-[540px]:p-5 border border-gray-200 rounded-xl shadow-sm"
          >
            {/* 540px 이하: 원 안에 숫자 */}
            <div className="min-[540px]:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${stat.info.bgColor} flex items-center justify-center`}
                  >
                    <span className="text-sm font-bold text-white">
                      {stat.count.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    {stat.info.label}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-700">
                  {stat.count.toLocaleString()}건
                </span>
              </div>
            </div>

            {/* 540px 이상: 원래 디자인 */}
            <div className="hidden min-[540px]:block">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full ${stat.info.bgColor}`}
                  />
                  <span className="text-base font-bold text-gray-700">
                    {stat.info.label}
                  </span>
                </div>
                <span className="text-base font-bold text-gray-700">
                  {stat.count.toLocaleString()}건
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
