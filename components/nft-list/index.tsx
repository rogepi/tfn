import Image from "next/image"
import { useAddress, useContract, useNFT, useOwnedNFTs } from "@thirdweb-dev/react"
import { ADDRESS } from "~/config/address"
import { NATIVE_TOKEN_ADDRESS, NFT } from '@thirdweb-dev/sdk'

export default function NFTList({ nftList }: { nftList: NFT[] }) {
  const { contract: market_contract } = useContract(ADDRESS.MARKETPLACE, "marketplace")
  const sell = async (tokenId: string) => {
    const listing = {
      assetContractAddress: ADDRESS.NFT_COLLECTION,
      tokenId,
      startTimestamp: new Date(),
      listingDurationInSeconds: 86400,
      quantity: 1,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      buyoutPricePerToken: 0.001
    }
    const tx = await market_contract?.direct.createListing(listing)
    const receipt = tx?.receipt
    if (tx) {

      const listingId = tx.id

      const quantityDesired = 1
      await market_contract?.direct.buyoutListing(listingId, quantityDesired)
    }
  }

  return (
    <div>

      <div className="flex min-h-[500px] flex-wrap gap-5">
        {nftList?.map(item => {
          return (
            <div className="flex h-60 w-44 flex-col items-center justify-center gap-3 overflow-hidden rounded-md border hover:border-gray-300" key={item.metadata.id}>
              <div className="relative block h-full w-full">
                <Image src={item.metadata?.image as string} alt={item.metadata.name as string} fill sizes="100" />
              </div>
              <h2>
                {item.metadata.name}
              </h2>
              <div className="p-1">
                <button onClick={() => sell(item.metadata.id)} className="w-32 rounded-l border-r bg-blue-500 p-1 px-2 text-white hover:bg-blue-400">Sell</button>
                <button className="rounded-r bg-blue-500 p-1 px-2 text-white hover:bg-blue-400">:</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const SellDialog = () => {

}