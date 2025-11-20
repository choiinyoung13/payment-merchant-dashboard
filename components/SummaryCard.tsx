import { ReactNode } from 'react'

type SummaryCardProps = {
  title: string
  value: string | number
  valueSize?: 'default' | 'small'
  footer?: ReactNode
}

export default function SummaryCard({
  title,
  value,
  valueSize = 'default',
  footer,
}: SummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 min-[390px]:px-6 min-[390px]:py-4 flex flex-col gap-1 min-[390px]:gap-2">
      <div className="flex items-center gap-1">
        <span className="text-gray-700 text-xs min-[540px]:text-[0.9375rem] font-semibold">
          {title}
        </span>
        <span className="text-gray-400 text-xs pb-1 min-[540px]:text-sm">
          ⓘ
        </span>
      </div>
      <div
        className={`
          text-xl min-[540px]:text-1xl md:text-2xl
          text-gray-900 font-bold${valueSize === 'small' ? ' truncate' : ''}
        `}
      >
        {value}
      </div>
      {footer && <div className="mt-1.5 min-[390px]:mt-2">{footer}</div>}
    </div>
  )
}

