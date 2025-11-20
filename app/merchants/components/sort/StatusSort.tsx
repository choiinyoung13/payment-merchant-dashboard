'use client'

import { useContext } from 'react'
import { MerchantFilterContext } from '@/store/merchant-filter'

type StatusSortProps = {
  availableStatuses: string[]
}

type StatusSortButtonProps = {
  label: string
  active: boolean
  onClick: () => void
}

function StatusSortButton({ label, active, onClick }: StatusSortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 px-2 min-[390px]:px-4 py-2.5 text-sm min-[390px]:text-base font-black rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
        active ? 'bg-white' : 'bg-[#f2f4f6] text-gray-500 hover:bg-white'
      }`}
    >
      {label}
    </button>
  )
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
        <StatusSortButton
          key={status}
          label={getStatusLabel(status)}
          active={statusFilter === status}
          onClick={() => handleClick(status)}
        />
      ))}
    </div>
  )
}
