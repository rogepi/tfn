import * as React from 'react'
import { Inter } from 'next/font/google'
import Head from './head'
import Header from './header'
import Footer from './footer'
import { useNetworkMismatch } from '@thirdweb-dev/react'
import NetworkError from './network-error'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: '800',
})

export interface IContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: IContainerProps) => {
  const isMismatched = useNetworkMismatch()
  return (
    <>
      <Head />
      <div style={inter.style} className="h-full dark:bg-slate-900">
        <Header />
        <main className="container mx-auto mb-5 px-10">{children}</main>
        <Footer />
      </div>
      {isMismatched ? <NetworkError /> : null}
    </>
  )
}

export default Container
