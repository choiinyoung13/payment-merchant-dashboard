import { Dispatch, SetStateAction } from 'react'

export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

// 거래 내역 관련 타입
export interface PaymentListRes {
  paymentCode: string
  mchtCode: string
  amount: string
  currency: string
  payType: 'ONLINE' | string
  status: 'PENDING' | string
  paymentAt: string
}

// 가맹점 관련 타입
export interface MerchantListRes {
  mchtCode: string
  mchtName: string
  status: string
  bizType: string
}

export interface MerchantDetailRes {
  mchtCode: string
  mchtName: string
  status: string
  bizType: string
  bizNo: string
  address: string
  phone: string
  email: string
  registeredAt: string
  updatedAt: string
}

// 공통 코드 관련 타입
export interface StatusRes {
  code: string
  description: string
}

export interface PayTypeRes {
  type: string
  description: string
}

export type PaymentStatus = 'SUCCESS' | 'FAILED' | 'CANCELLED'
export type AmountSortOrder = 'amountAsc' | 'amountDesc'
export type PaymentType =
  | 'ONLINE'
  | 'DEVICE'
  | 'MOBILE'
  | 'VACT'
  | 'BILLING'
  | string

// 결제 필터 컨텍스트 타입
export interface PaymentFilterContextType {
  byDate: {
    startMonth: string
    endMonth: string
    setStartMonth: Dispatch<SetStateAction<string>>
    setEndMonth: Dispatch<SetStateAction<string>>
  }
  byAmountSort: {
    amountSortOrder: AmountSortOrder | null
    setAmountSortOrder: Dispatch<SetStateAction<AmountSortOrder | null>>
  }
  byStatus: {
    status: PaymentStatus | null
    setStatus: Dispatch<SetStateAction<PaymentStatus | null>>
  }
  byPayType: {
    payType: PaymentType | null
    setPayType: Dispatch<SetStateAction<PaymentType | null>>
  }
  bySearch: {
    search: string | null
    setSearch: Dispatch<SetStateAction<string | null>>
  }
  byMerchantSearch: {
    merchantSearch: string | null
    setMerchantSearch: Dispatch<SetStateAction<string | null>>
  }
}
