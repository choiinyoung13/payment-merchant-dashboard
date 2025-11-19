import type {
  ApiResponse,
  PaymentListRes,
  MerchantListRes,
  MerchantDetailRes,
  StatusRes,
  PayTypeRes,
} from '@/lib/types'

export const API_BASE_URL = 'https://recruit.paysbypays.com/api/v1'

// 모든 거래 내역을 조회
export async function getPaymentsList(): Promise<
  ApiResponse<PaymentListRes[]>
> {
  const response = await fetch('http://localhost:3000/api/v1/payments/list')
  if (!response.ok) {
    throw new Error(`Failed to fetch payments: ${response.status}`)
  }
  return response.json()
}

// 전체 가맹점 목록을 조회
export async function getMerchantsList(): Promise<
  ApiResponse<MerchantListRes[]>
> {
  const response = await fetch(`${API_BASE_URL}/merchants/list`)
  if (!response.ok) {
    throw new Error(`Failed to fetch merchants: ${response.status}`)
  }
  return response.json()
}

// 전체 가맹점 상세 정보를 조회
export async function getMerchantsDetails(): Promise<
  ApiResponse<MerchantDetailRes[]>
> {
  const response = await fetch(`${API_BASE_URL}/merchants/details`)
  if (!response.ok) {
    throw new Error(`Failed to fetch merchant details: ${response.status}`)
  }
  return response.json()
}

// 특정 가맹점 상세 정보를 조회
export async function getMerchantDetailByCode(
  mchtCode: string
): Promise<ApiResponse<MerchantDetailRes>> {
  const response = await fetch(`${API_BASE_URL}/merchants/details/${mchtCode}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch merchant detail: ${response.status}`)
  }
  return response.json()
}

// 결제 상태 코드를 조회
export async function getPaymentStatusCodes(): Promise<
  ApiResponse<StatusRes[]>
> {
  const response = await fetch(`${API_BASE_URL}/common/payment-status/all`)
  if (!response.ok) {
    throw new Error(`Failed to fetch payment status codes: ${response.status}`)
  }
  return response.json()
}

// 결제 수단 코드를 조회
export async function getPaymentTypeCodes(): Promise<
  ApiResponse<PayTypeRes[]>
> {
  const response = await fetch(`${API_BASE_URL}/common/paymemt-type/all`)
  if (!response.ok) {
    throw new Error(`Failed to fetch payment type codes: ${response.status}`)
  }
  return response.json()
}

// 가맹점 상태 코드를 조회
export async function getMerchantStatusCodes(): Promise<
  ApiResponse<StatusRes[]>
> {
  const response = await fetch(`${API_BASE_URL}/common/mcht-status/all`)
  if (!response.ok) {
    throw new Error(`Failed to fetch merchant status codes: ${response.status}`)
  }
  return response.json()
}
