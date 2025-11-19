import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'

type PayTypeSortButtonProps = {
  label: string
  active: boolean
  onClick: () => void
}

function PayTypeSortButton({ label, active, onClick }: PayTypeSortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 min-[390px]:px-4 py-2.5 text-sm min-[390px]:text-base font-black rounded-lg transition-colors cursor-pointer ${
        active ? 'bg-white' : 'bg-[#f2f4f6] text-gray-500 hover:bg-white'
      }`}
    >
      {label}
    </button>
  )
}

export default function PayTypeSort() {
  const { payType, setPayType } = useContext(PaymentFilterContext).byPayType

  const handleClick = (
    nextPayType: 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING' | null
  ) => {
    setPayType(prev => (prev === nextPayType ? null : nextPayType))
  }

  return (
    <div className="grid grid-cols-3 gap-2 bg-[#f2f4f6] p-1 rounded-lg">
      <PayTypeSortButton
        label="ONLINE"
        active={payType === 'ONLINE'}
        onClick={() => handleClick('ONLINE')}
      />
      <PayTypeSortButton
        label="DEVICE"
        active={payType === 'DEVICE'}
        onClick={() => handleClick('DEVICE')}
      />
      <PayTypeSortButton
        label="MOBILE"
        active={payType === 'MOBILE'}
        onClick={() => handleClick('MOBILE')}
      />
      <PayTypeSortButton
        label="VACT"
        active={payType === 'VACT'}
        onClick={() => handleClick('VACT')}
      />
      <PayTypeSortButton
        label="BILLING"
        active={payType === 'BILLING'}
        onClick={() => handleClick('BILLING')}
      />
    </div>
  )
}
