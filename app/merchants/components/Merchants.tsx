'use client'

import { MerchantListRes } from '@/lib/types'
import { useState, useContext } from 'react'
import { MerchantFilterContext } from '@/store/merchant-filter'
import MerchantsTable from './MerchantsTable'
import MerchantSummaryCards from './MerchantSummaryCards'
import MerchantStatusStats from './MerchantStatusStats'
import MerchantSort from './sort/MerchantSort'
import MerchantDetailModal from './MerchantDetailModal'
import { getFilteredMerchants } from '../utils/merchantHelper'

export default function Merchants({
  merchants,
}: {
  merchants: MerchantListRes[]
}) {
  const { byStatus, bySearch } = useContext(MerchantFilterContext)
  const [selectedMerchantCode, setSelectedMerchantCode] = useState<
    string | null
  >(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredMerchants = getFilteredMerchants(
    merchants,
    byStatus.status,
    bySearch.search
  )

  const availableStatuses = Array.from(
    new Set(merchants.map(m => m.status))
  ).sort()

  const handleMerchantClick = (mchtCode: string) => {
    setSelectedMerchantCode(mchtCode)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMerchantCode(null)
  }

  return (
    <>
      <MerchantSort availableStatuses={availableStatuses} />
      <MerchantStatusStats merchants={filteredMerchants} />
      <MerchantSummaryCards merchants={filteredMerchants} />
      <MerchantsTable
        merchants={filteredMerchants}
        onMerchantClick={handleMerchantClick}
      />
      <MerchantDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mchtCode={selectedMerchantCode}
      />
    </>
  )
}
