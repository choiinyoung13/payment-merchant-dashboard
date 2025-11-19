import { PaymentFilterContext } from '@/store/payment-filter'
import { useContext } from 'react'

export default function MerchantSearchSort() {
  const { merchantSearch, setMerchantSearch } =
    useContext(PaymentFilterContext).byMerchantSearch

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMerchantSearch(e.target.value)
  }

  return (
    <div className="relative w-full sm:w-48 lg:w-60">
      <svg
        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
          merchantSearch ? 'text-[#425aeb]' : 'text-gray-400'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        className="w-full pl-10 pr-3 py-2 border text-gray-700 border-gray-300 rounded-md focus:outline-none text-sm lg:text-base font-bold placeholder:text-gray-400"
        type="text"
        placeholder="가맹점명 입력"
        value={merchantSearch || ''}
        onChange={handleChange}
      />
    </div>
  )
}
