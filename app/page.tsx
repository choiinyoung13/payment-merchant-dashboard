import { getMerchantsList, getPaymentsList } from '@/lib/api'
import Dashboard from '@/components/Dashboard'

export default async function Home() {
  const [paymentsResponse, merchantsResponse] = await Promise.all([
    getPaymentsList(),
    getMerchantsList(),
  ])

  const payments = paymentsResponse.data || []
  const merchants = merchantsResponse.data || []

  return <Dashboard payments={payments} merchants={merchants} />
}
