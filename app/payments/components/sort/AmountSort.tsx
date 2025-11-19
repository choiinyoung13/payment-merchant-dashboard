import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'

type AmountSortButtonProps = {
  label: string
  active: boolean
  onClick: () => void
}

function AmountSortButton({ label, active, onClick }: AmountSortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 px-2 min-[390px]:px-4 py-2.5 text-sm min-[390px]:text-base font-black rounded-lg transition-colors cursor-pointer ${
        active ? 'bg-white' : 'bg-[#f2f4f6] text-gray-500 hover:bg-white'
      }`}
    >
      {label}
    </button>
  )
}

export default function AmountSort() {
  const { amountSortOrder, setAmountSortOrder } =
    useContext(PaymentFilterContext).byAmountSort

  const handleClick = (order: 'amountAsc' | 'amountDesc') => {
    setAmountSortOrder(prev => (prev === order ? null : order))
  }

  return (
    <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
      <AmountSortButton
        label="낮은 금액순"
        active={amountSortOrder === 'amountAsc'}
        onClick={() => handleClick('amountAsc')}
      />
      <AmountSortButton
        label="높은 금액순"
        active={amountSortOrder === 'amountDesc'}
        onClick={() => handleClick('amountDesc')}
      />
    </div>
  )
}
