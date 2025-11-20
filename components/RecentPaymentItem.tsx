import { PaymentListRes, MerchantListRes } from '@/lib/types'
import { getMerchantName } from '@/utils/dateHelper'

const STATUS_COLORS: Record<string, string> = {
  SUCCESS: 'bg-[#425aeb]',
  FAILED: 'bg-rose-500',
  CANCELLED: 'bg-gray-400',
}

type RecentPaymentItemProps = {
  payment: PaymentListRes
  merchants: MerchantListRes[]
}

export default function RecentPaymentItem({
  payment,
  merchants,
}: RecentPaymentItemProps) {
  const statusColor = STATUS_COLORS[payment.status] || 'bg-gray-400'

  return (
    <div className="flex items-center justify-between p-2.5 min-[390px]:p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-2.5 min-[390px]:gap-3 flex-1 min-w-0">
        <div
          className={`w-2 h-2 min-[390px]:w-2.5 min-[390px]:h-2.5 rounded-full shrink-0 ${statusColor}`}
        />
        <div className="flex-1 min-w-0">
          <div className="text-xs min-[390px]:text-sm font-medium text-gray-900 truncate">
            {getMerchantName(payment.mchtCode, merchants)}
          </div>
          <div className="text-[10px] min-[390px]:text-xs text-gray-500">
            {new Date(payment.paymentAt).toLocaleString('ko-KR', {
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </div>
        </div>
      </div>
      <div className="text-xs min-[390px]:text-sm font-semibold text-gray-900 ml-2">
        {parseFloat(payment.amount).toLocaleString()}원
      </div>
    </div>
  )
}

