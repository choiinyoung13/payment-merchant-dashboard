'use client'

import { useEffect, ReactNode } from 'react'

type BottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  resetButton?: ReactNode
  maxHeight?: string
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  resetButton,
  maxHeight = 'auto',
}: BottomSheetProps) {
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

      <div
        className="fixed inset-x-0 bottom-0 z-50 w-[98%] mx-auto bg-white rounded-t-3xl shadow-xl animate-slide-up"
        style={{ maxHeight }}
      >
        <div className="w-full p-5 min-[390px]:p-8">
          <div className="flex items-center justify-between gap-2 mb-6 min-[390px]:mb-8">
            <h2 className="text-md min-[390px]:text-[1.3rem] font-bold text-gray-800">
              {title}
            </h2>
            {resetButton}
          </div>

          <div className="space-y-6 min-[390px]:space-y-8">{children}</div>

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
