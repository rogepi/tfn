import { useState } from 'react'
import ConnectDialog from '~/components/dialog/connect'
import clsx from 'clsx'

const ConnectButton = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={clsx(
          'rounded-full border p-2 px-4 font-semibold hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-900',
          className
        )}
      >
        Connect Wallet
      </button>
      <ConnectDialog isOpen={open} closeModal={() => setOpen(false)} />
    </>
  )
}

export default ConnectButton