import { getMerchantsList, getPaymentsList } from '@/lib/api'

export default async function Home() {
  const [paymentsResponse, merchantsResponse] = await Promise.all([
    getPaymentsList(),
    getMerchantsList(),
  ])

  const payments = paymentsResponse.data || []
  const merchants = merchantsResponse.data || []

  // 결제 요약
  const totalAmount = payments.reduce((sum, payment) => {
    return sum + parseFloat(payment.amount || '0')
  }, 0)

  const paymentsByStatus = payments.reduce<Record<string, number>>(
    (acc, payment) => {
      acc[payment.status] = (acc[payment.status] || 0) + 1
      return acc
    },
    {}
  )

  const paymentsByPayType = payments.reduce<Record<string, number>>(
    (acc, payment) => {
      acc[payment.payType] = (acc[payment.payType] || 0) + 1
      return acc
    },
    {}
  )

  // 가맹점 요약
  const totalMerchants = merchants.length
  const activeMerchants = merchants.filter(m => m.status === 'ACTIVE').length
  const inactiveMerchants = totalMerchants - activeMerchants

  return (
    <div className="p-8 space-y-10">
      {/* 상단: 전체 결제/가맹점 한눈에 요약 */}
      <section>
        <h1 className="text-3xl font-bold mb-6">PG 대시보드</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">전체 거래 건수</p>
            <p className="text-2xl font-bold">{payments.length}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">전체 거래 금액</p>
            <p className="text-2xl font-bold">
              {totalAmount.toLocaleString()} {payments[0]?.currency || ''}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">평균 거래 금액</p>
            <p className="text-2xl font-bold">
              {payments.length > 0
                ? (totalAmount / payments.length).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                : 0}{' '}
              {payments[0]?.currency || ''}
            </p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-600">전체 가맹점 수</p>
            <p className="text-2xl font-bold">{totalMerchants}</p>
          </div>
        </div>
      </section>

      {/* 결제 상태/수단 분포 */}
      <section className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">결제 상태별 건수</h2>
          <div className="space-y-2">
            {Object.entries(paymentsByStatus).map(([status, count]) => (
              <div
                key={status}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
              >
                <span className="font-medium text-gray-700">{status}</span>
                <span className="text-gray-900">
                  {count.toLocaleString()} 건
                </span>
              </div>
            ))}
            {Object.keys(paymentsByStatus).length === 0 && (
              <p className="text-gray-500 text-sm">
                표시할 결제 상태가 없습니다.
              </p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">결제 수단별 건수</h2>
          <div className="space-y-2">
            {Object.entries(paymentsByPayType).map(([type, count]) => (
              <div
                key={type}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
              >
                <span className="font-medium text-gray-700">{type}</span>
                <span className="text-gray-900">
                  {count.toLocaleString()} 건
                </span>
              </div>
            ))}
            {Object.keys(paymentsByPayType).length === 0 && (
              <p className="text-gray-500 text-sm">
                표시할 결제 수단이 없습니다.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 가맹점 요약 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">가맹점 요약</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">전체 가맹점 수</p>
            <p className="text-2xl font-bold">{totalMerchants}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">활성 가맹점</p>
            <p className="text-2xl font-bold">{activeMerchants}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">비활성 가맹점</p>
            <p className="text-2xl font-bold">{inactiveMerchants}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
