import Image, { StaticImageData } from 'next/image'
import * as RadixDialog from '@radix-ui/react-dialog'
import IConMetaMask from '~/public/images/metamask-fox.svg'
import IConWalletConnect from '~/public/images/walletconnect-alternative.webp'
import IConCoinbaseWallet from '~/public/images/walletlink-alternative.webp'

import {
  useCoinbaseWallet,
  useMetamask,
  useWalletConnect,
} from '@thirdweb-dev/react'
import { IconClose } from '~/components/icons/close'
import clsx from 'clsx'

const ConnectDialog = ({ children }: { children: React.ReactNode }) => {
  const connectWithMetamask = useMetamask()
  const connectWithCoinbaseWallet = useCoinbaseWallet()
  const connectWithWalletConnect = useWalletConnect()

  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <div className="fixed inset-0 z-50 mt-[20vh] flex justify-center">
          <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity " />
          <RadixDialog.Content className="fixed z-50 grid w-full max-w-sm scale-100 gap-4 rounded-md bg-white p-6 opacity-100 dark:bg-gray-800">
            <RadixDialog.Title className="text-center text-lg font-bold">
              Connnect your wallet
            </RadixDialog.Title>
            <RadixDialog.Description className="text-sm text-gray-500">
              If you don&apos;t have a wallet, you can select a provider and
              create one now.{' '}
              <a
                href="https://opensea.io/learn/what-is-crypto-wallet"
                className="text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                Learn more
              </a>
            </RadixDialog.Description>
            <RadixDialog.Close className="absolute top-4 right-4 transition-opacity hover:opacity-100">
              <IconClose />
            </RadixDialog.Close>

            <ConnectWalletButton
              name="MetaMask"
              icon={IConMetaMask}
              connect={connectWithMetamask}
            />
            <ConnectWalletButton
              name="Coninbase Wallet"
              icon={IConCoinbaseWallet}
              connect={connectWithCoinbaseWallet}
            />
            <ConnectWalletButton
              name="Walletconnect"
              icon={IConWalletConnect}
              connect={connectWithWalletConnect}
            />
          </RadixDialog.Content>
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

const ConnectWalletButton = ({
  name,
  icon,
  connect,
}: {
  name: string
  icon: StaticImageData
  connect: () => void
}) => {
  return (
    <button
      onClick={() => connect()}
      className="flex items-center gap-2 rounded-full border p-2 px-4 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      <Image src={icon} alt={name} width={24} height={24} />
      <span className="text-sm font-semibold">{name}</span>
    </button>
  )
}

const ConnectButton = ({ className }: { className?: string }) => {
  return (
    <ConnectDialog>
      <button
        className={clsx(
          'rounded-full border p-2 px-4 font-semibold hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-900',
          className
        )}
      >
        Connect Wallet
      </button>
    </ConnectDialog>
  )
}

export default ConnectButton
