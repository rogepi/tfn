import { NFT } from "@thirdweb-dev/sdk"
import Image from "next/image"
import Link from "next/link"
import { addressSplit } from "~/helper/utils"


const NFTList = ({ list, title }: { list: NFT[], title: string }) => {
  return (
    <div>
      <div className="text-3xl">{title}</div>
      <div className="my-8 grid grid-cols-6 gap-5">
        {list.map(item =>
          <Link href={`/nft/${item.metadata.id}`} className="flex h-60 w-full max-w-48 flex-col items-center justify-center
          gap-3 overflow-hidden rounded-md border shadow-md hover:border-gray-300 dark:border-slate-500" key={item.metadata.id}>
            <div className="relative block h-48 w-full transition ease-in-out hover:scale-110 flex-1">
              <Image src={item.metadata.image as string} alt={item.metadata.name as string} fill sizes="100" />
            </div>
            <div className="flex w-full flex-col justify-start px-3">
              <div className="text-lg font-semibold">{item.metadata.name}</div>
              <div className="mt-2 text-xs text-gray-600">owner</div>
              <div className="font-semibold">{addressSplit(item.owner)}</div>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default NFTList