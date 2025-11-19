import { getMerchantsList } from '@/lib/api'
import Link from 'next/link'

interface MerchantsPageProps {
  searchParams?: {
    status?: string
  }
}

export default async function MerchantsPage({
  searchParams,
}: MerchantsPageProps) {
  const response = await getMerchantsList()
  const merchants = response.data || []

  const statusFilter = searchParams?.status ?? 'ALL'
  const availableStatuses = Array.from(
    new Set(merchants.map(m => m.status))
  ).sort()

  const filteredMerchants =
    statusFilter === 'ALL'
      ? merchants
      : merchants.filter(m => m.status === statusFilter)

  // 요약 정보 (필터링된 데이터 기준)
  const activeMerchants = filteredMerchants.filter(
    m => m.status === 'ACTIVE'
  ).length
  const inactiveMerchants = filteredMerchants.length - activeMerchants

  const createHref = (nextStatus: string) => {
    if (nextStatus === 'ALL') return '/merchants'
    const params = new URLSearchParams()
    params.set('status', nextStatus)
    return `/merchants?${params.toString()}`
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">가맹점 목록</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">필터</h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 mr-2">상태</span>
          <Link
            href={createHref('ALL')}
            className={`px-3 py-1 rounded-full text-sm border ${
              statusFilter === 'ALL'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            전체
          </Link>
          {availableStatuses.map(status => (
            <Link
              key={status}
              href={createHref(status)}
              className={`px-3 py-1 rounded-full text-sm border ${
                statusFilter === status
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status}
            </Link>
          ))}
        </div>
      </section>

      {/* 요약 정보 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">요약 정보</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">표시 중인 가맹점 수</p>
            <p className="text-2xl font-bold">{filteredMerchants.length}</p>
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

      {/* 가맹점 리스트 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">가맹점 목록</h2>
        {filteredMerchants.length === 0 ? (
          <p className="text-gray-500">조건에 해당하는 가맹점이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {filteredMerchants.map(merchant => (
              <div
                key={merchant.mchtCode}
                className="mb-4 p-6 border border-gray-300 rounded-lg hover:shadow-md transition-shadow bg-white"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-gray-700">
                      가맹점코드:
                    </span>{' '}
                    <span className="text-gray-900">{merchant.mchtCode}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      가맹점명:
                    </span>{' '}
                    <span className="text-gray-900">{merchant.mchtName}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">상태:</span>{' '}
                    <span className="text-gray-900">{merchant.status}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">업종:</span>{' '}
                    <span className="text-gray-900">{merchant.bizType}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/merchants/${merchant.mchtCode}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    상세보기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
