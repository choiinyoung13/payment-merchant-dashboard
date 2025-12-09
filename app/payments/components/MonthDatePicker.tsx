'use client'

import { PaymentFilterContext } from '@/store/payment-filter'
import { useContext, useState, useEffect } from 'react'
import { getCurrentMonth } from '@/utils/dateHelper'
import { formatDisplay } from '../utils/paymentHelper'

const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
]

type MonthDatePickerProps = {
  variant?: 'default' | 'icon-only'
}

export default function MonthDatePicker({
  variant = 'default',
}: MonthDatePickerProps = {}) {
  const { startMonth, endMonth, setStartMonth, setEndMonth } =
    useContext(PaymentFilterContext).byDate

  const [isOpen, setIsOpen] = useState(false)
  const [tempStart, setTempStart] = useState<string>(startMonth)
  const [tempEnd, setTempEnd] = useState<string>(endMonth)
  const [startYear, setStartYear] = useState<number>(2024)
  const [endYear, setEndYear] = useState<number>(2024)
  const [currentMonth, setCurrentMonth] = useState<string>('')

  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])

  useEffect(() => {
    // 클라이언트에서만 실행하여 Hydration 에러 방지
    const now = new Date()
    const currentYear = now.getFullYear()
    setStartYear(currentYear)
    setEndYear(currentYear)
    setCurrentMonth(getCurrentMonth())
  }, [])

  useEffect(() => {
    setTempStart(startMonth)
    setTempEnd(endMonth)
    if (startMonth) {
      const [year] = startMonth.split('-')
      setStartYear(parseInt(year))
    }
    if (endMonth) {
      const [year] = endMonth.split('-')
      setEndYear(parseInt(year))
    }
  }, [startMonth, endMonth])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const calculateMonthDiff = () => {
    if (!tempStart || !tempEnd) return 1
    const [startY, startM] = tempStart.split('-').map(Number)
    const [endY, endM] = tempEnd.split('-').map(Number)
    return Math.abs((endY - startY) * 12 + (endM - startM)) + 1
  }

  const handleStartMonthClick = (year: number, month: number) => {
    const monthStr = `${year}-${String(month).padStart(2, '0')}`
    setTempStart(monthStr)
  }

  const handleEndMonthClick = (year: number, month: number) => {
    const monthStr = `${year}-${String(month).padStart(2, '0')}`
    setTempEnd(monthStr)
  }

  const isStartMonth = (year: number, month: number) => {
    const monthStr = `${year}-${String(month).padStart(2, '0')}`
    return monthStr === tempStart
  }

  const isEndMonth = (year: number, month: number) => {
    const monthStr = `${year}-${String(month).padStart(2, '0')}`
    return monthStr === tempEnd
  }

  const isBeforeStartDate = (year: number, month: number) => {
    if (!tempStart) return false
    const monthStr = `${year}-${String(month).padStart(2, '0')}`
    return monthStr < tempStart
  }

  const isAfterEndDate = (year: number, month: number) => {
    if (!tempEnd) return false
    const monthStr = `${year}-${String(month).padStart(2, '0')}`
    return monthStr > tempEnd
  }

  const handleDone = () => {
    setStartMonth(tempStart)
    setEndMonth(tempEnd || tempStart)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setTempStart(startMonth)
    setTempEnd(endMonth)
    setIsOpen(false)
  }

  const renderStartMonthCalendar = () => (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setStartYear(startYear - 1)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-3 h-3 min-[390px]:w-4 min-[390px]:h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3 className="text-base min-[390px]:text-lg font-semibold text-gray-900">
          {startYear}년
        </h3>
        <button
          onClick={() => setStartYear(startYear + 1)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-3 h-3 min-[390px]:w-4 min-[390px]:h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((monthName, idx) => {
          const month = idx + 1
          const selected = isStartMonth(startYear, month)
          const disabled = isAfterEndDate(startYear, month)

          return (
            <button
              key={month}
              onClick={() =>
                !disabled && handleStartMonthClick(startYear, month)
              }
              disabled={disabled}
              className={`
                py-2.5 min-[390px]:py-3 px-2 min-[390px]:px-3 text-sm min-[390px]:text-base font-semibold rounded-lg transition-all
                ${
                  disabled
                    ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                    : selected
                    ? 'bg-[#425aeb] text-white hover:bg-[#3651d9]'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {monthName}
            </button>
          )
        })}
      </div>
    </div>
  )

  const renderEndMonthCalendar = () => (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setEndYear(endYear - 1)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-3 h-3 min-[390px]:w-4 min-[390px]:h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h3 className="text-base min-[390px]:text-lg font-semibold text-gray-900">
          {endYear}년
        </h3>
        <button
          onClick={() => setEndYear(endYear + 1)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-3 h-3 min-[390px]:w-4 min-[390px]:h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {MONTHS.map((monthName, idx) => {
          const month = idx + 1
          const selected = isEndMonth(endYear, month)
          const disabled = isBeforeStartDate(endYear, month)

          return (
            <button
              key={month}
              onClick={() => !disabled && handleEndMonthClick(endYear, month)}
              disabled={disabled}
              className={`
                py-2.5 min-[390px]:py-3 px-2 min-[390px]:px-3 text-sm min-[390px]:text-base font-semibold rounded-lg transition-all
                ${
                  disabled
                    ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                    : selected
                    ? 'bg-[#425aeb] text-white hover:bg-[#3651d9]'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {monthName}
            </button>
          )
        })}
      </div>
    </div>
  )

  const hasDateFilter =
    currentMonth && (startMonth !== currentMonth || endMonth !== currentMonth)

  if (!isOpen) {
    if (variant === 'icon-only') {
      return (
        <button
          onClick={() => setIsOpen(true)}
          className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
          title="기간 선택"
        >
          <svg
            className={`w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors ${
              hasDateFilter ? 'text-[#425aeb]' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      )
    }

    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 min-[390px]:gap-2 lg:gap-3 bg-white border border-gray-300 rounded-lg px-1.5 min-[390px]:px-2 lg:px-3.5 py-1.5 min-[390px]:py-2 hover:bg-gray-100 transition-all cursor-pointer"
      >
        <svg
          className={`w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors ${
            hasDateFilter ? 'text-[#425aeb]' : 'text-gray-400'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="hidden lg:inline text-base text-gray-600 font-bold">
          {formatDisplay(tempStart, tempEnd)}
        </span>
      </button>
    )
  }

  const renderButton = (onClick: () => void) => {
    if (variant === 'icon-only') {
      return (
        <button
          onClick={onClick}
          className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
          title="기간 선택"
        >
          <svg
            className={`w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors ${
              hasDateFilter ? 'text-[#425aeb]' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      )
    }

    return (
      <button
        onClick={onClick}
        className="inline-flex items-center gap-1.5 min-[390px]:gap-2 lg:gap-3 bg-white border border-gray-300 rounded-lg px-1.5 min-[390px]:px-2 lg:px-3.5 py-1.5 min-[390px]:py-2 hover:bg-gray-100 transition-all cursor-pointer"
      >
        <svg
          className={`w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors ${
            hasDateFilter ? 'text-[#425aeb]' : 'text-gray-400'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="hidden lg:inline text-base text-gray-600 font-bold">
          {formatDisplay(tempStart, tempEnd)}
        </span>
      </button>
    )
  }

  if (!isOpen) {
    return renderButton(() => setIsOpen(true))
  }

  return (
    <>
      {renderButton(() => setIsOpen(false))}

      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={handleCancel}
      />

      <div className="fixed inset-x-0 bottom-0 z-50 w-[98%] mx-auto bg-white rounded-t-3xl shadow-xl animate-slide-up max-h-[95vh] overflow-y-auto">
        <div className="w-full p-5 min-[390px]:p-8">
          <div className="flex min-[390px]:items-center justify-between gap-2 min-[390px]:gap-0 mb-4 min-[390px]:mb-6">
            <h2 className="text-base min-[390px]:text-[1.3rem] font-bold text-gray-800">
              기간 선택
            </h2>
            <div className="flex items-center gap-1.5 min-[390px]:gap-2 px-2.5 min-[390px]:px-4 py-1 min-[390px]:py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-xs min-[390px]:text-sm text-gray-700 font-medium">
                {formatDisplay(tempStart, tempEnd)}
              </span>
              <svg
                className="w-3 h-3 min-[390px]:w-4 min-[390px]:h-4 text-[#425aeb]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 min-[390px]:gap-6 md:gap-8 mb-4 min-[390px]:mb-6">
            <div className="flex-1">
              <div className="text-sm min-[390px]:text-md font-semibold text-gray-600 mb-2.5 min-[390px]:mb-4">
                시작 기간
              </div>
              {renderStartMonthCalendar()}
            </div>
            <div className="hidden md:block w-px bg-gray-300"></div>
            <div className="block md:hidden h-px bg-gray-300"></div>
            <div className="flex-1">
              <div className="text-sm min-[390px]:text-md font-semibold text-gray-600 mb-2.5 min-[390px]:mb-4">
                끝 기간
              </div>
              {renderEndMonthCalendar()}
            </div>
          </div>

          <div className="flex flex-col min-[390px]:flex-row items-stretch min-[390px]:items-center justify-between gap-2.5 pt-3.5 min-[390px]:pt-4.5 border-t border-gray-300">
            <span className="text-sm min-[390px]:text-base text-gray-600 font-semibold text-left">
              {calculateMonthDiff()}개월 선택됨
            </span>
            <div className="flex gap-2 min-[390px]:gap-3">
              <button
                onClick={handleCancel}
                className="cursor-pointer flex-1 min-[390px]:flex-none px-5 min-[390px]:px-8 py-2.5 min-[390px]:py-3.5 text-sm min-[390px]:text-base font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleDone}
                className="cursor-pointer flex-1 min-[390px]:flex-none px-5 min-[390px]:px-8 py-2.5 min-[390px]:py-3.5 text-sm min-[390px]:text-base font-semibold text-white bg-[#425aeb] hover:bg-[#3651d9] rounded-xl transition-colors"
              >
                완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
