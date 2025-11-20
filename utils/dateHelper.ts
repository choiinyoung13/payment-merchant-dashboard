import { MerchantListRes } from '@/lib/types'

export const getCurrentMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}
export const getMerchantName = (
  mchtCode: string,
  merchants: MerchantListRes[]
) => {
  const merchant = merchants.find(m => m.mchtCode === mchtCode)
  return merchant?.mchtName || mchtCode
}
