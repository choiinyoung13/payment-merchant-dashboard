'use client'

import { MerchantListRes } from '@/lib/types'
import SummaryCard from '@/components/SummaryCard'

export default function MerchantSummaryCards({
  merchants = [],
}: {
  merchants?: MerchantListRes[]
}) {
  const totalCount = merchants.length
  const activeCount = merchants.filter(m => m.status === 'ACTIVE').length
  const inactiveCount = totalCount - activeCount

  // 업종별 집계
  const bizTypeCounts = merchants.reduce((acc, merchant) => {
    acc[merchant.bizType] = (acc[merchant.bizType] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topBizType = Object.entries(bizTypeCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]

  // 브랜드별 집계 (가맹점명에서 브랜드 추출)
  const brandCounts = merchants.reduce((acc, merchant) => {
    // 가맹점명을 공백으로 분리하여 첫 번째 단어를 브랜드로 간주
    // 예: "브런치커피 강남점" -> "브런치커피"
    const brand = merchant.mchtName.split(/\s+/)[0]
    acc[brand] = (acc[brand] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topBrand = Object.entries(brandCounts).sort((a, b) => b[1] - a[1])[0]

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
