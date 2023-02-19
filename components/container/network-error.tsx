import { ChainId, useNetwork } from '@thirdweb-dev/react'

const NetworkError = () => {
  const [, switchNetwork] = useNetwork()

  return (
    <div
      className="fixed bottom-0 right-0 z-50 mb-[10vh] mr-[10vh] flex
    items-center justify-center rounded bg-red-400 p-3 text-white shadow-md"
    >
      Current network is not<span className="ml-2 font-bold">Goerli</span>
      <button
        className="ml-3 rounded bg-red-600 p-1 hover:bg-red-500"
        onClick={() => switchNetwork?.(ChainId.Goerli)}
      >
        Toggle
      </button>
    </div>
  )
}

export default NetworkError
