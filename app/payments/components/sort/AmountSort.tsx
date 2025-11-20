import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import SortButton from '@/components/SortButton'

export default function AmountSort() {
  const { amountSortOrder, setAmountSortOrder } =
    useContext(PaymentFilterContext).byAmountSort

  const handleClick = (order: 'amountAsc' | 'amountDesc') => {
    setAmountSortOrder(prev => (prev === order ? null : order))
  }

  return (
    <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
      <SortButton
        label="낮은 금액순"
        active={amountSortOrder === 'amountAsc'}
        onClick={() => handleClick('amountAsc')}
      />
      <SortButton
        label="높은 금액순"
        active={amountSortOrder === 'amountDesc'}
        onClick={() => handleClick('amountDesc')}
      />
    </div>
  )
}
