'use client'

import { useContext } from 'react'
import { MerchantFilterContext } from '@/store/merchant-filter'
import StatusSort from './StatusSort'
import ResetSort from './ResetSort'
import BottomSheet from '@/components/BottomSheet'

type MerchantSortModalProps = {
  isOpen: boolean
  onClose: () => void
  availableStatuses: string[]
}

export default function MerchantSortModal({
  isOpen,
  onClose,
  availableStatuses,
}: MerchantSortModalProps) {
  const { byStatus } = useContext(MerchantFilterContext)

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="가맹점 보기 설정"
      resetButton={
        <ResetSort
          onReset={() => {
            byStatus.setStatus(null)
          }}
        />
      }
    >
      <div>
        <h3 className="text-sm min-[390px]:text-[1.05rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
          상태
        </h3>
        <StatusSort availableStatuses={availableStatuses} />
      </div>
    </BottomSheet>
  )
}

