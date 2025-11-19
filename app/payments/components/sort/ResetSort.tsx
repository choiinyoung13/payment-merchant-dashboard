import { PaymentFilterContext } from '@/store/payment-filter'
import { useContext } from 'react'

export default function ResetSort() {
  const {
    byAmountSort: { setAmountSortOrder },
    byStatus: { setStatus },
    byPayType: { setPayType },
    bySearch: { setSearch },
  } = useContext(PaymentFilterContext)
  const handleReset = () => {
    setAmountSortOrder(null)
    setStatus(null)
    setPayType(null)
    setSearch(null)
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      className="flex items-center gap-1 min-[390px]:gap-1.5 p-1.5 min-[390px]:p-2 text-sm min-[390px]:text-md text-gray-600 hover:font-bold rounded-md transition-colors cursor-pointer shrink-0"
      title="정렬 초기화"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 min-[390px]:w-4 min-[390px]:h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
      초기화
    </button>
  )
}
