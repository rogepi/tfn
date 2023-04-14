import {
  useAddress,
} from '@thirdweb-dev/react'
import Avatar from './avatar'
import ConnectButton from '~/components/button/connect'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Wallet = () => {
  const address = useAddress()
  const router = useRouter()
  useEffect(() => {
    router.prefetch('/profile')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {address ? (
        <Avatar address={address} />
      ) : (

        <ConnectButton className="text-sm w-36" />
      )}
    </div>
  )
}

export default Wallet
