'use client'

import { useContext } from 'react'
import { MerchantFilterContext } from '@/store/merchant-filter'
import SortButton from '@/components/SortButton'

type StatusSortProps = {
  availableStatuses: string[]
}

export default function StatusSort({ availableStatuses }: StatusSortProps) {
  const { byStatus } = useContext(MerchantFilterContext)
  const statusFilter = byStatus.status || 'ALL'

  const handleClick = (nextStatus: string) => {
    byStatus.setStatus(nextStatus === statusFilter ? null : nextStatus)
  }

  const getStatusLabel = (status: string) => {
    if (status === 'ACTIVE') return '활성'
    if (status === 'INACTIVE') return '비활성'
    if (status === 'READY') return '준비'
    if (status === 'CLOSED') return '종료'
    return status
  }

  return (
    <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
      {availableStatuses.map(status => (
        <SortButton
          key={status}
          label={getStatusLabel(status)}
          active={statusFilter === status}
          onClick={() => handleClick(status)}
        />
      ))}
    </div>
  )
}
