import Image from "next/image"
import Link from "next/link"
import { INFT } from "~/helper/types"

const NewNFTs = ({ listing }: { listing: INFT[] }) => {
  return (
    <div>
      <div className="text-3xl">New NFTs</div>
      <div className="my-8 flex  gap-5">
        {listing.map(item =>
          <Link href={`/nft/${item.tokenId}`} className="flex h-60 w-44 flex-col items-center justify-center gap-3 overflow-hidden rounded-md border shadow-md hover:border-gray-300" key={item.id}>
            <div className="relative block h-full w-full">
              <Image src={item.image as string} alt={item.name as string} fill sizes="100" />
            </div>
            <div className="flex w-44 flex-col justify-start px-3">
              <div className="text-lg font-semibold">{item.name} #{item.tokenId}</div>
              <div className="mt-2 text-xs text-gray-600">price</div>
              <div className="text-lg font-semibold">{item.price}ETH</div>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default NewNFTs