import Image from "next/image"
import { useContract } from "@thirdweb-dev/react"
import * as RadixDialog from '@radix-ui/react-dialog'

import { ADDRESS } from "~/config/address"
import { NATIVE_TOKEN_ADDRESS, NFT } from '@thirdweb-dev/sdk'
import { ProfileNFT } from "~/hooks/use-nfts"
import { IconClose } from "../icons/close"
import { useRef, useState } from "react"
import NFTDetailDialog from "./nft-detail-dialog"
import Link from "next/link"

export default function NFTList({ nftList }: { nftList: ProfileNFT[] }) {
  const [tokenId, setTokenId] = useState<string>()

  return (
    <div>
      <div className="flex min-h-[500px] flex-wrap gap-5">
        {nftList?.map(item => {
          return (
            <Link href={`/nft/${item.id}`}
              className="flex h-60 w-44 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-md
            border-2 shadow-md  hover:border-gray-300 dark:border-slate-500" key={item.id}>
              <div className="relative block h-full w-full">
                <Image src={item.image} alt={item.name} fill sizes="100" />
              </div>
              <h2>
                {item.name}
              </h2>
              <div className="flex w-full">
                {
                  item.isSales ?
                    <>
                      <button disabled
                        className="flex-1 border-r-2 border-slate-200 bg-blue-500 p-1 px-2 text-white hover:bg-blue-400 dark:border-slate-500">
                        {item.price + ' ETH'}</button>
                      <button className=" bg-blue-500 p-1 px-2 text-white hover:bg-blue-400">:</button>

                    </> :
                    <>
                      <SellDialog tokenId={tokenId as string}>
                        <button
                          onClick={() => setTokenId(item.id)}
                          className="flex-1 border-r-2 border-slate-200 bg-blue-500 p-1 px-2 text-white hover:bg-blue-400 dark:border-slate-500">
                          Sell</button>
                      </SellDialog>
                      <button className=" bg-blue-500 p-1 px-2 text-white hover:bg-blue-400">:</button>
                    </>
                }
              </div>
            </Link>
          )
        })}
      </div>
    </div >
  )
}

const SellDialog = ({ children, tokenId }: { children: React.ReactNode, tokenId: string }) => {
  const ref = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { contract: market_contract } = useContract(ADDRESS.MARKETPLACE, "marketplace")
  const sell = async () => {
    setIsLoading(true)
    if (ref.current?.value) {
      const listing = {
        assetContractAddress: ADDRESS.NFT_COLLECTION,
        tokenId,
        startTimestamp: new Date(),
        listingDurationInSeconds: 86400,
        quantity: 1,
        currencyContractAddress: NATIVE_TOKEN_ADDRESS,
        buyoutPricePerToken: ref.current?.value
      }
      const tx = await market_contract?.direct.createListing(listing)
      if (tx?.id) {
        console.log(tx?.id)
      } else {
        console.log('sell error')
      }
    }
    setIsLoading(false)
  }

  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <div className="fixed inset-0 z-50 mt-[20vh] flex justify-center">
          <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity " />
          <RadixDialog.Content className="fixed z-50 grid w-full max-w-sm scale-100 gap-4 rounded-md bg-white p-6 opacity-100 dark:bg-gray-800">
            <RadixDialog.Title className="text-center text-lg font-bold">
              Would you want to sell it
            </RadixDialog.Title>
            <RadixDialog.Description className="text-sm text-gray-500">
              Please input the price
            </RadixDialog.Description>
            <RadixDialog.Close className="absolute top-4 right-4 transition-opacity hover:opacity-100">
              <IconClose />
            </RadixDialog.Close>
            <div className="space-y-3">
              <input className="mr-2 w-32 border px-3 text-center font-semibold" ref={ref} />
              <span className="font-bold">ETH</span>
              <div className="flex">
                <button onClick={() => sell()} className="flex-1 rounded bg-blue-500 p-1 font-semibold text-white">
                  {isLoading ? 'Wating...' : 'Sell'}
                </button>
              </div>
            </div>
          </RadixDialog.Content>
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}