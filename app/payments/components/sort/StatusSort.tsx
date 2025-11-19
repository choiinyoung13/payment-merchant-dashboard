import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'

type StatusSortButtonProps = {
  label: string
  active: boolean
  onClick: () => void
}

function StatusSortButton({ label, active, onClick }: StatusSortButtonProps) {
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

export default function StatusSort() {
  const { status, setStatus } = useContext(PaymentFilterContext).byStatus

  const handleClick = (
    nextStatus: 'SUCCESS' | 'FAILED' | 'CANCELLED' | null
  ) => {
    setStatus(prev => (prev === nextStatus ? null : nextStatus))
  }

  return (
    <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
      <StatusSortButton
        label="결제완료"
        active={status === 'SUCCESS'}
        onClick={() => handleClick('SUCCESS')}
      />
      <StatusSortButton
        label="결제실패"
        active={status === 'FAILED'}
        onClick={() => handleClick('FAILED')}
      />
      <StatusSortButton
        label="결제취소"
        active={status === 'CANCELLED'}
        onClick={() => handleClick('CANCELLED')}
      />
    </div>
  )
}
