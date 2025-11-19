import { PaymentListRes, PaymentStatus, MerchantListRes } from '@/lib/types'

// 결제 날짜를 월로 변환
export const getPaymentMonth = (paymentAt: string) => {
  const paymentDate = new Date(paymentAt)
  const paymentYear = paymentDate.getFullYear()
  const paymentMonth = String(paymentDate.getMonth() + 1).padStart(2, '0')
  return `${paymentYear}-${paymentMonth}`
}

// 결제 상태 색상 및 라벨 반환
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'SUCCESS':
      return 'text-[#425aeb] bg-[#425aeb]/10'
    case 'FAILED':
      return 'text-rose-700 bg-rose-50'
    case 'CANCELLED':
      return 'text-gray-700 bg-gray-100'
    case 'PENDING':
      return 'text-amber-700 bg-amber-50'
    default:
      return 'text-gray-700 bg-gray-100'
  }
}

// 결제 상태 라벨 반환
export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'SUCCESS':
      return '결제완료'
    case 'FAILED':
      return '결제실패'
    case 'CANCELLED':
      return '결제취소'
    case 'PENDING':
      return '승인대기'
    default:
      return status
  }
}

// 필터링된 결제 내역 반환
export const getFilteredPayments = (
  payments: PaymentListRes[],
  startMonth: string,
  endMonth: string,
  status: 'SUCCESS' | 'FAILED' | 'CANCELLED' | null,
  payType: string | null,
  amountSortOrder: 'amountAsc' | 'amountDesc' | null,
  search: string | null,
  merchantSearch: string | null,
  merchants: MerchantListRes[] = []
) => {
  return payments
    .filter(payment => {
      const paymentMonthStr = getPaymentMonth(payment.paymentAt)
      if (!endMonth) return paymentMonthStr >= startMonth
      return paymentMonthStr >= startMonth && paymentMonthStr <= endMonth
    })
    .filter(payment => !status || payment.status === status)
    .filter(payment => !payType || payment.payType === payType)
    .sort((a, b) => {
      // 금액 정렬 선택 시: 금액 기준
      if (amountSortOrder) {
        const diff = parseFloat(a.amount) - parseFloat(b.amount)
        return amountSortOrder === 'amountAsc' ? diff : -diff
      }

      // 기본: 최신순 (날짜 내림차순)
      return new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime()
    })
    .filter(
      payment =>
        !search ||
        payment.paymentCode.toLowerCase().includes(search.toLowerCase())
    )
    .filter(payment => {
      if (!merchantSearch) return true
      const merchant = merchants.find(m => m.mchtCode === payment.mchtCode)
      const merchantName = merchant?.mchtName || payment.mchtCode
      return merchantName.toLowerCase().includes(merchantSearch.toLowerCase())
    })
}

// 총 거래액 계산
export const getTotalAmount = (payments: PaymentListRes[]) => {
  return payments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0)
}
