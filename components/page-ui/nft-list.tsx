import { ProfileNFT } from "~/hooks/use-nfts"

import NFTCard from "../nft/nft-card"

export default function NFTList({ nftList }: { nftList: ProfileNFT[] }) {
  return (
    <div>
      <div className="flex min-h-[500px] flex-wrap gap-5">
        {nftList?.map(item => {
          return (
            <NFTCard nft={item} key={item.id} />
          )
        })}
      </div>
    </div >
  )
}

