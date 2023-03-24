import { Fragment } from "react"
import { Transition, Dialog as HLDialog } from "@headlessui/react"
import {
  useCoinbaseWallet,
  useMetamask,
  useWalletConnect,
} from '@thirdweb-dev/react'
import WalletButton from "../button/wallet"
import IConMetaMask from '~/public/images/metamask-fox.svg'
import IConWalletConnect from '~/public/images/walletconnect-alternative.webp'
import IConCoinbaseWallet from '~/public/images/walletlink-alternative.webp'
import { IconClose } from "../icons/close"

export interface IConnectDialogProps {
  isOpen: boolean
  closeModal: () => void
}

const ConnectDialog = ({ isOpen, closeModal, }: IConnectDialogProps) => {
  const connectWithMetamask = useMetamask()
  const connectWithCoinbaseWallet = useCoinbaseWallet()
  const connectWithWalletConnect = useWalletConnect()
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HLDialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 " />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HLDialog.Panel className="w-full max-w-[395px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <HLDialog.Title
                  as="h3"
                  className=" text-center text-lg font-bold"
                >
                  Connect your wallet
                  <span onClick={closeModal} className="float-right cursor-pointer justify-items-end pt-[2px]">
                    <IconClose />
                  </span>
                </HLDialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
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
                  </p>
                </div>
                <div className="w-full space-y-4 pt-4">
                  <WalletButton
                    name="MetaMask"
                    icon={IConMetaMask}
                    connect={connectWithMetamask}
                  />
                  <WalletButton
                    name="Coninbase Wallet"
                    icon={IConCoinbaseWallet}
                    connect={connectWithCoinbaseWallet}
                  />
                  <WalletButton
                    name="Walletconnect"
                    icon={IConWalletConnect}
                    connect={connectWithWalletConnect}
                  />
                </div>
              </HLDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HLDialog>
    </Transition>
  )
}

export default ConnectDialog