import { useContext } from 'react'
import { PaymentFilterContext } from '@/store/payment-filter'
import SortButton from '@/components/SortButton'

export default function PayTypeSort() {
  const { payType, setPayType } = useContext(PaymentFilterContext).byPayType

  const handleClick = (
    nextPayType: 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING' | null
  ) => {
    setPayType(prev => (prev === nextPayType ? null : nextPayType))
  }

  return (
    <div className="grid grid-cols-3 gap-2 bg-[#f2f4f6] p-1 rounded-lg">
      <SortButton
        label="ONLINE"
        active={payType === 'ONLINE'}
        onClick={() => handleClick('ONLINE')}
        flex={false}
      />
      <SortButton
        label="DEVICE"
        active={payType === 'DEVICE'}
        onClick={() => handleClick('DEVICE')}
        flex={false}
      />
      <SortButton
        label="MOBILE"
        active={payType === 'MOBILE'}
        onClick={() => handleClick('MOBILE')}
        flex={false}
      />
      <SortButton
        label="VACT"
        active={payType === 'VACT'}
        onClick={() => handleClick('VACT')}
        flex={false}
      />
      <SortButton
        label="BILLING"
        active={payType === 'BILLING'}
        onClick={() => handleClick('BILLING')}
        flex={false}
      />
    </div>
  )
}
