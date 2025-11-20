'use client'

import { PaymentListRes, MerchantListRes } from '@/lib/types'
import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import { getFilteredPayments } from '../utils/paymentHelper'
import { getMerchantName } from '@/utils/dateHelper'

export default function PaymentsTable({
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

  if (filteredPayments.length === 0) {
    return (
      <div className="p-8 min-[390px]:p-10 sm:p-12 text-center">
        <div className="text-gray-400 text-sm min-[390px]:text-base">
          거래 내역이 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-0 bg-white overflow-hidden">
      {filteredPayments.map((payment, index) => (
        <div
          key={payment.paymentCode}
          className={`flex items-stretch pr-3 min-[390px]:pr-4 sm:pr-6 py-2.5 min-[390px]:py-3 mb-2 min-[390px]:mb-3 hover:bg-gray-100/50 transition-colors active:bg-gray-100 relative`}
        >
          {/* 왼쪽: 상태 아이콘 */}
          <div className="absolute left-1.5 min-[390px]:left-2 top-1/2 -translate-y-1/2">
            {payment.status === 'SUCCESS' ? (
              <svg
                className="w-5 h-5 min-[390px]:w-6 min-[390px]:h-6 sm:w-7 sm:h-7 text-[#425aeb]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : payment.status === 'FAILED' ? (
              <svg
                className="w-5 h-5 min-[390px]:w-6 min-[390px]:h-6 sm:w-7 sm:h-7 text-rose-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 min-[390px]:w-6 min-[390px]:h-6 sm:w-7 sm:h-7 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center pl-9 min-[390px]:pl-10 sm:pl-12">
            <div className="flex items-center justify-between gap-1.5 min-[390px]:gap-2 mb-0.5 min-[390px]:mb-1">
              <h3 className="text-sm min-[390px]:text-base sm:text-md font-bold text-gray-900 truncate">
                {getMerchantName(payment.mchtCode, merchants || [])}
              </h3>
              <span className="text-sm min-[390px]:text-lg font-bold text-gray-900 whitespace-nowrap">
                {parseFloat(payment.amount).toLocaleString()}
                <span className="text-gray-500 font-normal text-[10px] min-[390px]:text-xs ml-0.5">
                  {payment.currency === 'KRW' ? '원' : payment.currency}
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between gap-1.5 min-[390px]:gap-2 text-[10px] min-[390px]:text-xs text-gray-500">
              <div className="flex items-center gap-1 min-[390px]:gap-2">
                <span>{payment.payType}</span>
                <span>•</span>
                <span className="font-mono truncate max-w-[80px] min-[390px]:max-w-[100px] sm:max-w-[120px]">
                  {payment.paymentCode}
                </span>
              </div>
              <span className="whitespace-nowrap">
                {new Date(payment.paymentAt).toLocaleString('ko-KR', {
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
