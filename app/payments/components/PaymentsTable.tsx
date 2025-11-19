'use client'

import { PaymentListRes, MerchantListRes } from '@/lib/types'
import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import {
  getFilteredPayments,
  getStatusColor,
  getStatusLabel,
} from '../utils/paymentHelper'

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

  // 가맹점 코드를 가맹점명으로 매핑
  const getMerchantName = (mchtCode: string) => {
    const merchant = merchants.find(m => m.mchtCode === mchtCode)
    return merchant?.mchtName || mchtCode
  }

  return (
    <>
      {filteredPayments.length === 0 ? (
        <div className="p-12 text-center">
          <div className="text-gray-400 text-base">거래 내역이 없습니다.</div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full">
            <thead className="bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  결제상태
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  가맹점명
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  결제코드
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  결제금액
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  결제수단
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  결제일시
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredPayments.map(payment => (
                <tr
                  key={payment.paymentCode}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-md ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {getStatusLabel(payment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {getMerchantName(payment.mchtCode)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-mono">
                    {payment.paymentCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900">
                    {parseFloat(payment.amount).toLocaleString()}
                    <span className="text-gray-500 font-normal">
                      {payment.currency === 'KRW'
                        ? '원'
                        : ` ${payment.currency}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium">
                      {payment.payType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(payment.paymentAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
