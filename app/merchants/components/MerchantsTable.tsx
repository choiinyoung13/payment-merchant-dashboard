'use client'

import { MerchantListRes } from '@/lib/types'

export default function MerchantsTable({
  merchants = [],
  onMerchantClick,
}: {
  merchants?: MerchantListRes[]
  onMerchantClick?: (mchtCode: string) => void
}) {
  const getStatusBadge = (status: string) => {
    if (status === 'ACTIVE') {
      return (
        <span className="inline-flex items-center justify-center w-12 min-[390px]:w-14 px-2 py-0.5 text-[10px] min-[390px]:text-xs font-medium rounded-md text-[#425aeb] bg-[#425aeb]/10">
          활성
        </span>
      )
    } else if (status === 'INACTIVE') {
      return (
        <span className="inline-flex items-center justify-center w-12 min-[390px]:w-14 px-2 py-0.5 text-[10px] min-[390px]:text-xs font-medium rounded-md text-gray-700 bg-gray-100">
          비활성
        </span>
      )
    } else if (status === 'READY') {
      return (
        <span className="inline-flex items-center justify-center w-12 min-[390px]:w-14 px-2 py-0.5 text-[10px] min-[390px]:text-xs font-medium rounded-md text-gray-700 bg-gray-100">
          준비
        </span>
      )
    } else if (status === 'CLOSED') {
      return (
        <span className="inline-flex items-center justify-center w-12 min-[390px]:w-14 px-2 py-0.5 text-[10px] min-[390px]:text-xs font-medium rounded-md text-gray-700 bg-gray-100">
          종료
        </span>
      )
    }
    // 기본 상태도 뱃지로 표시
    return (
      <span className="inline-flex items-center justify-center w-12 min-[390px]:w-14 px-2 py-0.5 text-[10px] min-[390px]:text-xs font-medium rounded-md text-gray-700 bg-gray-100">
        {status}
      </span>
    )
  }

  if (merchants.length === 0) {
    return (
      <div className="p-8 min-[390px]:p-10 sm:p-12 text-center">
        <div className="text-gray-400 text-sm min-[390px]:text-base">
          가맹점이 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-0 bg-white overflow-hidden">
      {merchants.map((merchant, index) => (
        <div
          key={merchant.mchtCode}
          onClick={() => onMerchantClick?.(merchant.mchtCode)}
          className={`flex items-center pr-3 min-[390px]:pr-4 sm:pr-6 py-2.5 min-[390px]:py-3 mb-2 min-[390px]:mb-3 hover:bg-gray-100/50 transition-colors active:bg-gray-100 relative gap-3 cursor-pointer`}
        >
          {/* 제일 좌측: 상태 뱃지 */}
          <div className="shrink-0 flex items-center">
            {getStatusBadge(merchant.status)}
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 min-[390px]:gap-2 mb-0.5 min-[390px]:mb-1">
              <h3 className="text-sm min-[390px]:text-base sm:text-md font-bold text-gray-900 truncate">
                {merchant.mchtName}
              </h3>
            </div>
            <div className="flex items-center justify-between gap-1.5 min-[390px]:gap-2 text-[10px] min-[390px]:text-xs text-gray-500">
              <div className="flex items-center gap-1 min-[390px]:gap-2">
                <span>{merchant.bizType}</span>
                <span>•</span>
                <span className="font-mono truncate max-w-[80px] min-[390px]:max-w-[100px] sm:max-w-[120px]">
                  {merchant.mchtCode}
                </span>
              </div>
            </div>
          </div>
          <div className="shrink-0 flex items-center">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
