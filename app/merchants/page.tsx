import { getMerchantsList } from '@/lib/api'
import Merchants from './components/Merchants'

export default async function MerchantsPage() {
  const response = await getMerchantsList()
  const merchants = response.data || []

  return (
    <div className="p-6 md:p-8">
      <Merchants merchants={merchants} />
    </div>
  )
}
