import { getMerchantDetailByCode } from '@/lib/api'
import Link from 'next/link'

interface PageProps {
  params: {
    mchtCode: string
  }
}

export default async function MerchantDetailPage({ params }: PageProps) {
  const { mchtCode } = await params

  try {
    const response = await getMerchantDetailByCode(mchtCode)
    const merchant = response.data

    return (
      <div className="p-8">
        <Link
          href="/merchants"
          className="mb-4 inline-block text-blue-600 hover:text-blue-800"
        >
          ← 목록으로
        </Link>
        <h1 className="text-3xl font-bold mb-8">가맹점 상세 정보</h1>

        <div className="mt-8 bg-white border border-gray-300 rounded-lg p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-gray-700">가맹점코드:</span>{' '}
                <span className="text-gray-900">{merchant.mchtCode}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">가맹점명:</span>{' '}
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
              <div>
                <span className="font-semibold text-gray-700">사업자번호:</span>{' '}
                <span className="text-gray-900">{merchant.bizNo}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">전화번호:</span>{' '}
                <span className="text-gray-900">{merchant.phone}</span>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-700">주소:</span>{' '}
              <span className="text-gray-900">{merchant.address}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">이메일:</span>{' '}
              <span className="text-gray-900">{merchant.email}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <span className="font-semibold text-gray-700">등록일시:</span>{' '}
                <span className="text-gray-900">{merchant.registeredAt}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">수정일시:</span>{' '}
                <span className="text-gray-900">{merchant.updatedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <Link
          href="/merchants"
          className="mb-4 inline-block text-blue-600 hover:text-blue-800"
        >
          ← 목록으로
        </Link>
        <h1 className="text-3xl font-bold mb-8">가맹점 상세 정보</h1>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-semibold mb-2">
            가맹점 정보를 불러오는 중 오류가 발생했습니다.
          </p>
          <p className="text-red-500">
            {error instanceof Error ? error.message : '알 수 없는 오류'}
          </p>
        </div>
      </div>
    )
  }
}
