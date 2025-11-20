'use client'

import { useState, useContext } from 'react'
import { MerchantFilterContext } from '@/store/merchant-filter'
import SearchSort from '../SearchSort'
import MerchantSortModal from './MerchantSortModal'

type MerchantSortProps = {
  availableStatuses: string[]
}

export default function MerchantSort({
  availableStatuses,
}: MerchantSortProps) {
  const { byStatus } = useContext(MerchantFilterContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const statusFilter = byStatus.status || 'ALL'
  const hasActiveFilter = statusFilter !== 'ALL'

  return (
    <div className="mb-5 space-y-3">
      {/* 640px 이하: 검색 + 보기설정 같은 줄 */}
      <div className="w-full flex items-center justify-between gap-2 sm:hidden">
        <SearchSort />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 min-[390px]:gap-2 lg:gap-3 rounded-lg px-1.5 min-[390px]:px-2 lg:px-3.5 py-1.5 min-[390px]:py-2 text-base text-gray-500 hover:text-gray-900 transition-all cursor-pointer flex-shrink-0"
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

      {/* 640px 이상: 검색 + 보기설정 같은 줄 */}
      <div className="hidden sm:flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <SearchSort />
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 min-[390px]:gap-2 lg:gap-3 rounded-lg px-1.5 min-[390px]:px-2 lg:px-3.5 py-1.5 min-[390px]:py-2 text-base text-gray-500 hover:text-gray-900 transition-all cursor-pointer flex-shrink-0"
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

      <MerchantSortModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableStatuses={availableStatuses}
      />
    </div>
  )
}

