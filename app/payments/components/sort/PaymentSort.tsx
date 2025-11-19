'use client'

import { useState, useContext } from 'react'
import SearchSort from './SearchSort'
import MerchantSearchSort from './MerchantSearchSort'
import SortModal from './SortModal'
import { PaymentFilterContext } from '@/store/payment-filter'
import MonthDatePicker from '../MonthDatePicker'

export default function PaymentSort() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { status } = useContext(PaymentFilterContext).byStatus
  const { payType } = useContext(PaymentFilterContext).byPayType
  const { amountSortOrder } = useContext(PaymentFilterContext).byAmountSort

  const hasActiveFilter = status || payType || amountSortOrder

  return (
    <div className="mb-5 space-y-3">
      {/* 640px 이하: 달력 + 보기설정 같은 줄 */}
      <div className="w-full flex items-center justify-between gap-2 sm:hidden">
        <MonthDatePicker />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 min-[390px]:gap-2 lg:gap-3 bg-white border border-gray-300 rounded-lg px-1.5 min-[390px]:px-2 lg:px-3.5 py-1.5 min-[390px]:py-2 text-base text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer flex-shrink-0"
        >
          <svg
            className={`w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors ${
              hasActiveFilter ? 'text-[#425aeb]' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          <span className="hidden lg:inline">보기 설정</span>
        </button>
      </div>

      {/* 640px 이상: 달력 + 검색들 + 보기설정 같은 줄 */}
      <div className="hidden sm:flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <MonthDatePicker />
          <SearchSort />
          <MerchantSearchSort />
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 min-[390px]:gap-2 lg:gap-3 bg-white border border-gray-300 rounded-lg px-1.5 min-[390px]:px-2 lg:px-3.5 py-1.5 min-[390px]:py-2 text-base text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer flex-shrink-0"
        >
          <svg
            className={`w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors ${
              hasActiveFilter ? 'text-[#425aeb]' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          <span className="hidden lg:inline">보기 설정</span>
        </button>
      </div>

      {/* 640px 이하: 검색들 */}
      <div className="flex items-center gap-2 flex-wrap sm:hidden">
        <SearchSort />
        <MerchantSearchSort />
      </div>

      <SortModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
