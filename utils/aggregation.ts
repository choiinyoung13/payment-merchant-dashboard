import { PaymentListRes, MerchantListRes } from '@/lib/types'

// ==================== Payment Aggregations ====================

/**
 * 결제 상태별 집계
 */
export function getPaymentStatusCounts(payments: PaymentListRes[]) {
  return {
    SUCCESS: payments.filter(p => p.status === 'SUCCESS').length,
    FAILED: payments.filter(p => p.status === 'FAILED').length,
    CANCELLED: payments.filter(p => p.status === 'CANCELLED').length,
  }
}

/**
 * 가맹점별 결제 금액 총합 계산
 */
export function getMerchantAmounts(
  payments: PaymentListRes[]
): Record<string, number> {
  return payments.reduce((acc, payment) => {
    const amount = parseFloat(payment.amount)
    if (!acc[payment.mchtCode]) {
      acc[payment.mchtCode] = 0
    }
    acc[payment.mchtCode] += amount
    return acc
  }, {} as Record<string, number>)
}

/**
 * 가맹점별 거래 건수 계산
 */
export function getMerchantCounts(
  payments: PaymentListRes[]
): Record<string, number> {
  return payments.reduce((acc, payment) => {
    acc[payment.mchtCode] = (acc[payment.mchtCode] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * 최다 거래액 가맹점 찾기
 */
export function getTopMerchantByAmount(
  payments: PaymentListRes[],
  merchants: MerchantListRes[]
): { merchant: MerchantListRes | null; amount: number } {
  const merchantAmounts = getMerchantAmounts(payments)
  const topMerchantCode = Object.entries(merchantAmounts).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0]

  const topMerchant = topMerchantCode
    ? merchants.find(m => m.mchtCode === topMerchantCode)
    : null

  const topMerchantAmount = topMerchantCode
    ? merchantAmounts[topMerchantCode]
    : 0

  return {
    merchant: topMerchant || null,
    amount: topMerchantAmount,
  }
}

/**
 * Top 가맹점 목록 (금액 기준)
 */
export function getTopMerchantsByAmount(
  payments: PaymentListRes[],
  merchants: MerchantListRes[],
  limit: number = 5
): Array<{ code: string; name: string; amount: number; count: number }> {
  const merchantAmounts = getMerchantAmounts(payments)
  const merchantCounts = getMerchantCounts(payments)

  return Object.entries(merchantAmounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([code, amount]) => ({
      code,
      name: merchants.find(m => m.mchtCode === code)?.mchtName || code,
      amount,
      count: merchantCounts[code] || 0,
    }))
}

/**
 * Top 가맹점 목록 (건수 기준)
 */
export function getTopMerchantsByCount(
  payments: PaymentListRes[],
  merchants: MerchantListRes[],
  limit: number = 5
): Array<{ code: string; name: string; count: number; amount: number }> {
  const merchantAmounts = getMerchantAmounts(payments)
  const merchantCounts = getMerchantCounts(payments)

  return Object.entries(merchantCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([code, count]) => ({
      code,
      name: merchants.find(m => m.mchtCode === code)?.mchtName || code,
      count,
      amount: merchantAmounts[code] || 0,
    }))
}

/**
 * 결제 수단별 집계
 */
export function getPayTypeCounts(
  payments: PaymentListRes[]
): Record<string, number> {
  return payments.reduce((acc, payment) => {
    acc[payment.payType] = (acc[payment.payType] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * 총 거래액 계산
 */
export function getTotalAmount(payments: PaymentListRes[]): number {
  return payments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0)
}

/**
 * 최근 거래 내역 (최신순)
 */
export function getRecentPayments(
  payments: PaymentListRes[],
  limit: number = 5
): PaymentListRes[] {
  return [...payments]
    .sort(
      (a, b) =>
        new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime()
    )
    .slice(0, limit)
}

// ==================== Merchant Aggregations ====================

/**
 * 가맹점 상태별 집계
 */
export function getMerchantStatusCounts(
  merchants: MerchantListRes[]
): Record<string, number> {
  return merchants.reduce((acc, merchant) => {
    acc[merchant.status] = (acc[merchant.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * 활성 가맹점 수
 */
export function getActiveMerchantCount(merchants: MerchantListRes[]): number {
  return merchants.filter(m => m.status === 'ACTIVE').length
}

/**
 * 업종별 집계
 */
export function getBizTypeCounts(
  merchants: MerchantListRes[]
): Record<string, number> {
  return merchants.reduce((acc, merchant) => {
    acc[merchant.bizType] = (acc[merchant.bizType] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * 최다 업종 찾기
 */
export function getTopBizType(
  merchants: MerchantListRes[]
): [string, number] | null {
  const bizTypeCounts = getBizTypeCounts(merchants)
  const topBizType = Object.entries(bizTypeCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]

  return topBizType ? (topBizType as [string, number]) : null
}

/**
 * 브랜드별 집계 (가맹점명에서 브랜드 추출)
 */
export function getBrandCounts(
  merchants: MerchantListRes[]
): Record<string, number> {
  return merchants.reduce((acc, merchant) => {
    // 가맹점명을 공백으로 분리하여 첫 번째 단어를 브랜드로 간주
    // 예: "브런치커피 강남점" -> "브런치커피"
    const brand = merchant.mchtName.split(/\s+/)[0]
    acc[brand] = (acc[brand] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}

/**
 * 최다 브랜드 찾기
 */
export function getTopBrand(
  merchants: MerchantListRes[]
): [string, number] | null {
  const brandCounts = getBrandCounts(merchants)
  const topBrand = Object.entries(brandCounts).sort((a, b) => b[1] - a[1])[0]

  return topBrand ? (topBrand as [string, number]) : null
}
