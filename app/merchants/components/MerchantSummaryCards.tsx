'use client'

import { MerchantListRes } from '@/lib/types'
import SummaryCard from '@/components/SummaryCard'
import {
  getActiveMerchantCount,
  getTopBizType,
  getTopBrand,
} from '@/utils/aggregation'

export default function MerchantSummaryCards({
  merchants = [],
}: {
  merchants?: MerchantListRes[]
}) {
  const totalCount = merchants.length
  const activeCount = getActiveMerchantCount(merchants)
  const inactiveCount = totalCount - activeCount

  const topBizType = getTopBizType(merchants)
  const topBrand = getTopBrand(merchants)

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-[390px]:gap-6">
      <SummaryCard
        title="총 가맹점 수"
        value={totalCount}
        footer={
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#425aeb] bg-[#425aeb]/10 rounded px-2 py-0.5 text-xs">
              활성 {activeCount}
            </span>
            <span className="text-gray-700 bg-gray-100 rounded px-2 py-0.5 text-xs">
              비활성 {inactiveCount}
            </span>
          </div>
        }
      />

      <SummaryCard title="활성 가맹점" value={activeCount} />

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
    </div>
  )
}
