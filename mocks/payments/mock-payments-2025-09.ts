import { PaymentListRes } from '@/lib/types'

// 2025-09 월 MOCK 결제 데이터 (임의 생성)
const raw2025_09: [string, string, string, string, string, string, string][] = [
  // 2025-09-05 카페
  [
    'PAY-20250905-0001',
    'MCHT-CAFE-001',
    '4300.00',
    'KRW',
    'DEVICE',
    'SUCCESS',
    '2025-09-05T00:10:00.000Z',
  ],
  [
    'PAY-20250905-0002',
    'MCHT-CAFE-002',
    '5200.00',
    'KRW',
    'MOBILE',
    'SUCCESS',
    '2025-09-05T00:25:00.000Z',
  ],
  [
    'PAY-20250905-0003',
    'MCHT-CAFE-003',
    '4800.00',
    'KRW',
    'DEVICE',
    'FAILED',
    '2025-09-05T00:40:00.000Z',
  ],

  // 2025-09-10 마트/샵
  [
    'PAY-20250910-0001',
    'MCHT-MART-001',
    '23000.00',
    'KRW',
    'DEVICE',
    'SUCCESS',
    '2025-09-10T01:00:00.000Z',
  ],
  [
    'PAY-20250910-0002',
    'MCHT-MART-001',
    '41000.00',
    'KRW',
    'DEVICE',
    'CANCELLED',
    '2025-09-10T01:20:00.000Z',
  ],
  [
    'PAY-20250910-0003',
    'MCHT-SHOP-001',
    '36000.00',
    'KRW',
    'ONLINE',
    'SUCCESS',
    '2025-09-10T02:10:00.000Z',
  ],

  // 2025-09-15 앱/교육
  [
    'PAY-20250915-0001',
    'MCHT-APP-001',
    '11000.00',
    'KRW',
    'BILLING',
    'SUCCESS',
    '2025-09-15T00:05:00.000Z',
  ],
  [
    'PAY-20250915-0002',
    'MCHT-APP-002',
    '15000.00',
    'KRW',
    'BILLING',
    'FAILED',
    '2025-09-15T00:15:00.000Z',
  ],
  [
    'PAY-20250915-0003',
    'MCHT-EDU-001',
    '59000.00',
    'KRW',
    'ONLINE',
    'SUCCESS',
    '2025-09-15T01:00:00.000Z',
  ],

  // 2025-09-20 여행/테스트
  [
    'PAY-20250920-0001',
    'MCHT-TRAVEL-001',
    '210000.00',
    'KRW',
    'ONLINE',
    'SUCCESS',
    '2025-09-20T02:00:00.000Z',
  ],
  [
    'PAY-20250920-0002',
    'MCHT-TRAVEL-001',
    '310000.00',
    'KRW',
    'ONLINE',
    'FAILED',
    '2025-09-20T02:30:00.000Z',
  ],
  [
    'PAY-20250920-0003',
    'MCHT-TEST-001',
    '9000.00',
    'KRW',
    'VACT',
    'SUCCESS',
    '2025-09-20T03:00:00.000Z',
  ],
]

export const mockPayments2025_09: PaymentListRes[] = raw2025_09.map(
  ([paymentCode, mchtCode, amount, currency, payType, status, paymentAt]) => ({
    paymentCode,
    mchtCode,
    amount,
    currency,
    payType,
    status,
    paymentAt,
  })
)
