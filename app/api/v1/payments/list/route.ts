import { mockPayments2025_09 } from '@/mocks/payments/mock-payments-2025-09'
import { mockPayments2025_10 } from '@/mocks/payments/mock-payments-2025-10'
import { mockPayments2025_11 } from '@/mocks/payments/mock-payments-2025-11'
import type { ApiResponse, PaymentListRes } from '@/lib/types'

export async function GET(request: Request) {
  // 모든 달의 데이터를 합치기
  const allPayments: PaymentListRes[] = [
    ...mockPayments2025_09,
    ...mockPayments2025_10,
    ...mockPayments2025_11,
  ]

  const response: ApiResponse<PaymentListRes[]> = {
    status: 0,
    message: 'Success',
    data: allPayments,
  }

  return Response.json(response)
}
