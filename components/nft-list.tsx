import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { ADDRESS } from "~/config/address"

export default function NFTList() {
  const { contract } = useContract(ADDRESS.NFT_COLLECTION, 'nft-collection')
  const { data } = useOwnedNFTs(contract, useAddress())
  console.log(data)
  return (
    <div>
    </div>
  )
}