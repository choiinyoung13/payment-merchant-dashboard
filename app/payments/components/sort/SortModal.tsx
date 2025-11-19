'use client'

import { useEffect } from 'react'
import AmountSort from './AmountSort'
import StatusSort from './StatusSort'
import PayTypeSort from './PayTypeSort'
import ResetSort from './ResetSort'

type SortModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SortModal({ isOpen, onClose }: SortModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 bottom-0 z-50 w-[98%] mx-auto bg-white rounded-t-3xl shadow-xl  animate-slide-up">
        <div className="w-full p-5 min-[390px]:p-8">
          <div className="flex items-center justify-between gap-2 mb-6 min-[390px]:mb-8">
            <h2 className="text-md min-[390px]:text-[1.3rem]  font-bold text-gray-800">
              거래 내역 보기 설정
            </h2>
            <ResetSort />
          </div>

          <div className="space-y-6 min-[390px]:space-y-8">
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
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 min-[390px]:mt-8 py-3.5 min-[390px]:py-4 bg-[#425aeb] text-white text-sm min-[390px]:text-base font-semibold rounded-xl cursor-pointer hover:bg-[#425aeb]/80 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </>
  )
}
