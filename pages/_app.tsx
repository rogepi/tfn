import type { AppProps } from 'next/app'

import Provider from '~/helper/provider'
import Container from '~/components/container'
import '~/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  )
}

export default MyApp
