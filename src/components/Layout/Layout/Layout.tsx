import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import Navbar from '@/components/Layout/Navbar/Navbar'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { useAccount } from 'wagmi'

const Footer = dynamic(() => import('@/components/Layout/Footer/Footer'), {
  ssr: false,
}) as () => JSX.Element

const Layout = ({
  children,
  noFooter,
}: {
  children: React.ReactNode
  noFooter?: boolean
}) => {
  const { data } = useAccount()
  const address = data?.address
  return (
    <>
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics-config" strategy="lazyOnload">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                user_id: '${address}',
                page_path: window.location.pathname,
                send_page_view: false
                });
            `}
      </Script>
      <Stack justify="space-between" minH="100vh" spacing={0}>
        <Navbar />
        <Box as="main" pt={20}>
          {children}
        </Box>
        {!noFooter && <Footer />}
      </Stack>
    </>
  )
}

export default Layout
