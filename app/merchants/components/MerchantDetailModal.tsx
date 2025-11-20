'use client'

import { useEffect, useState } from 'react'
import { MerchantDetailRes } from '@/lib/types'
import { getMerchantDetailByCode } from '@/lib/api'
import { getStatusLabel } from '../utils/merchantHelper'

type MerchantDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  mchtCode: string | null
}

export default function MerchantDetailModal({
  isOpen,
  onClose,
  mchtCode,
}: MerchantDetailModalProps) {
  const [merchant, setMerchant] = useState<MerchantDetailRes | null>(null)

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

  useEffect(() => {
    if (isOpen && mchtCode) {
      getMerchantDetailByCode(mchtCode).then(response => {
        setMerchant(response.data)
      })
    } else {
      setMerchant(null)
    }
  }, [isOpen, mchtCode])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 bottom-0 z-50 w-[98%] mx-auto bg-white rounded-t-3xl shadow-xl animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="w-full p-5 min-[390px]:p-8">
          <div className="mb-6 min-[390px]:mb-8">
            <h2 className="text-md min-[390px]:text-[1.3rem] font-bold text-gray-800">
              가맹점 상세 정보
            </h2>
          </div>

          {merchant ? (
            <div className="space-y-0">
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  가맹점코드
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right">
                  {merchant.mchtCode}
                </span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  가맹점명
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right">
                  {merchant.mchtName}
                </span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  상태
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right">
                  {getStatusLabel(merchant.status || '')}
                </span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  업종
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right">
                  {merchant.bizType}
                </span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  사업자번호
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right">
                  {merchant.bizNo}
                </span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  전화번호
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right">
                  {merchant.phone}
                </span>
              </div>
              <div className="flex items-start justify-between py-4 border-b border-gray-100">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  주소
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right flex-1 ml-4">
                  {merchant.address}
                </span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  이메일
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right">
                  {merchant.email}
                </span>
              </div>
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  등록일시
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right">
                  {new Date(merchant.registeredAt).toLocaleString('ko-KR')}
                </span>
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="text-sm min-[390px]:text-base text-gray-900 font-bold">
                  수정일시
                </span>
                <span className="text-sm min-[390px]:text-base text-gray-600 text-right">
                  {new Date(merchant.updatedAt).toLocaleString('ko-KR')}
                </span>
              </div>
            </div>
          ) : null}

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
