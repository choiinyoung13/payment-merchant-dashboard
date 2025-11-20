import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import SortButton from '@/components/SortButton'

export default function StatusSort() {
  const { status, setStatus } = useContext(PaymentFilterContext).byStatus

  const handleClick = (
    nextStatus: 'SUCCESS' | 'FAILED' | 'CANCELLED' | null
  ) => {
    setStatus(prev => (prev === nextStatus ? null : nextStatus))
  }

  return (
    <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
      <SortButton
        label="결제완료"
        active={status === 'SUCCESS'}
        onClick={() => handleClick('SUCCESS')}
      />
      <SortButton
        label="결제실패"
        active={status === 'FAILED'}
        onClick={() => handleClick('FAILED')}
      />
      <SortButton
        label="결제취소"
        active={status === 'CANCELLED'}
        onClick={() => handleClick('CANCELLED')}
      />
    </div>
  )
}
