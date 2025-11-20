'use client'

import AmountSort from './AmountSort'
import StatusSort from './StatusSort'
import PayTypeSort from './PayTypeSort'
import ResetSort from './ResetSort'
import BottomSheet from '@/components/BottomSheet'

type SortModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SortModal({ isOpen, onClose }: SortModalProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="거래 내역 보기 설정"
      resetButton={<ResetSort />}
    >
      <div>
        <h3 className="text-sm min-[390px]:text-[1.05rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
          금액
        </h3>
        <AmountSort />
      </div>

      <div>
        <h3 className="text-sm min-[390px]:text-[1.05rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
          결제상태
        </h3>
        <StatusSort />
      </div>

      <div>
        <h3 className="text-sm min-[390px]:text-[1.05rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
          결제수단
        </h3>
        <PayTypeSort />
      </div>
    </BottomSheet>
  )
}
