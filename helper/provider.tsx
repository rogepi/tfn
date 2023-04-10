import * as React from 'react'
import { coinbaseWallet, metamaskWallet, ThirdwebProvider, walletConnect } from '@thirdweb-dev/react'
import { ThemeProvider } from 'next-themes'


const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebProvider
      activeChain="goerli"
      authConfig={{
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || '',
        authUrl: '/api/auth',
      }}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect()
      ]}
    >
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ThirdwebProvider>
  )
}

export default Provider
