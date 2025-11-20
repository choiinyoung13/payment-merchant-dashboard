'use client'

import { MerchantListRes } from '@/lib/types'
import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import {
  getMerchantStatusCounts,
  getBizTypeCounts,
} from '@/utils/aggregation'

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: '활성',
  INACTIVE: '비활성',
  READY: '준비',
  CLOSED: '종료',
}

export default function MerchantStatusStats({
  merchants = [],
}: {
  merchants?: MerchantListRes[]
}) {
  const [barSize, setBarSize] = useState(20)

  useEffect(() => {
    const updateBarSize = () => {
      const width = window.innerWidth
      if (width < 390) {
        setBarSize(12)
      } else if (width < 540) {
        setBarSize(15)
      } else if (width < 768) {
        setBarSize(18)
      } else if (width < 1024) {
        setBarSize(20)
      } else {
        setBarSize(22)
      }
    }

    updateBarSize()
    window.addEventListener('resize', updateBarSize)
    return () => window.removeEventListener('resize', updateBarSize)
  }, [])

  // 상태별 집계
  const statusCounts = getMerchantStatusCounts(merchants)

  // 업종별 집계
  const bizTypeCounts = getBizTypeCounts(merchants)

  // 상태별 차트 데이터
  const statusData = Object.entries(statusCounts)
    .map(([status, count]) => ({
      name: STATUS_LABELS[status] || status,
      value: count,
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)

  // 업종별 차트 데이터
  const bizTypeData = Object.entries(bizTypeCounts)
    .map(([bizType, count]) => ({
      name: bizType,
      value: count,
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)

  if (merchants.length === 0) {
    return null
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-base font-semibold text-gray-900">
            {payload[0].payload.name}
          </p>
          <p className="text-base text-gray-600">
            {payload[0].value}개 (
            {((payload[0].value / merchants.length) * 100).toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="mb-8 bg-white border border-gray-200 rounded-xl shadow-sm p-3 min-[390px]:p-4 min-[540px]:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-[390px]:gap-8">
        {/* 상태별 분포 */}
        {statusData.length > 0 && (
          <div className="space-y-3 min-[390px]:space-y-4 border-r-0 md:border-r border-gray-200 pr-0 md:pr-6">
            <div className="flex items-center gap-1">
              <h4 className="text-xs min-[390px]:text-sm min-[540px]:text-[0.9375rem] font-semibold text-gray-700">
                상태별 분포
              </h4>
              <span className="pb-1 text-gray-400 text-[0.625rem] min-[390px]:text-xs min-[540px]:text-sm">
                ⓘ
              </span>
            </div>
            <div style={{ width: '100%', height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusData}
                  margin={{ top: 5, right: 10, left: 5, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    fill="#425aeb"
                    radius={[4, 4, 0, 0]}
                    barSize={barSize}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 업종별 분포 */}
        {bizTypeData.length > 0 && (
          <div className="space-y-3 min-[390px]:space-y-4 pl-0 md:pl-0">
            <div className="flex items-center gap-1">
              <h4 className="text-xs min-[390px]:text-sm min-[540px]:text-[0.9375rem] font-semibold text-gray-700">
                업종별 분포
              </h4>
              <span className="text-gray-400 text-[0.625rem] pb-1 min-[390px]:text-xs min-[540px]:text-sm">
                ⓘ
              </span>
            </div>
            <div style={{ width: '100%', height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bizTypeData}
                  margin={{ top: 5, right: 10, left: 5, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    width={40}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    fill="#425aeb"
                    radius={[4, 4, 0, 0]}
                    barSize={barSize}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
