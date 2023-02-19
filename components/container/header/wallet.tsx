import {
  ChainId,
  useAddress,
  useNetwork,
  useNetworkMismatch,
} from '@thirdweb-dev/react'
import Avatar from './avatar'
import ConnectButton from './connect-button'

const Wallet = () => {
  const address = useAddress()
  const [, switchNetwork] = useNetwork()
  const isMismatched = useNetworkMismatch()

  return (
    <div>
      {address ? (
        <Avatar address={address} />
      ) : (
        <ConnectButton className="text-sm" />
      )}
      {isMismatched ? (
        <div
          className="fixed bottom-0 z-50 mb-[10vh] mr-[10vh] flex justify-center bg-red-400 p-3
           text-white shadow-md"
          onClick={() => switchNetwork?.(ChainId.Goerli)}
        >
          Current network is not goerli
        </div>
      ) : null}
    </div>
  )
}

export default Wallet
