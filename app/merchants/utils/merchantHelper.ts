import { MerchantListRes } from '@/lib/types'

// 상태 라벨 반환
export const getStatusLabel = (status: string) => {
  if (status === 'ACTIVE') return '활성'
  if (status === 'INACTIVE') return '비활성'
  if (status === 'READY') return '준비'
  if (status === 'CLOSED') return '종료'
  return status
}

// 필터링된 가맹점 목록 반환
export const getFilteredMerchants = (
  merchants: MerchantListRes[],
  statusFilter: string | null,
  search: string | null
) => {
  let filtered = merchants

  // 상태 필터
  if (statusFilter && statusFilter !== 'ALL') {
    filtered = filtered.filter(m => m.status === statusFilter)
  }

  // 검색 필터
  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(
      m =>
        m.mchtName.toLowerCase().includes(searchLower) ||
        m.mchtCode.toLowerCase().includes(searchLower) ||
        m.bizType.toLowerCase().includes(searchLower)
    )
  }

  return filtered
}
