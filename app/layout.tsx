import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import ScrollToTop from '@/components/ScrollToTop'
import PaymentFilterContextProvider from '@/store/payment-filter'
import MerchantFilterContextProvider from '@/store/merchant-filter'

export const metadata: Metadata = {
  title: 'PG 대시보드',
  description: '결제대행사 대시보드',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="min-w-[320px]">
        <Navigation />
        <PaymentFilterContextProvider>
          <MerchantFilterContextProvider>
            {children}
          </MerchantFilterContextProvider>
        </PaymentFilterContextProvider>
        <ScrollToTop />
      </body>
    </html>
  )
}
