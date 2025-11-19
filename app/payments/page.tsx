import { getPaymentsList, getMerchantsList } from '@/lib/api'
import Payments from './components/Payments'

export default async function PaymentsPage() {
  const [paymentsResponse, merchantsResponse] = await Promise.all([
    getPaymentsList(),
    getMerchantsList(),
  ])
  const payments = paymentsResponse.data || []
  const merchants = merchantsResponse.data || []

  return (
    <div className="p-6 md:p-8">
      <Payments payments={payments} merchants={merchants} />
    </div>
  )
}
