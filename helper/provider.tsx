import * as React from 'react'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { ThemeProvider } from 'next-themes'

const activeChainId = ChainId.Goerli

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      authConfig={{
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || '',
        authUrl: '/api/auth',
      }}
    >
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </ThirdwebProvider>
  )
}

export default Provider
