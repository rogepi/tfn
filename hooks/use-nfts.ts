import { useActiveListings, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'
import { ADDRESS } from '~/config/address'

export interface ProfileNFT {
  id: string
  name: string
  image: string
  desc: string
  props?: {
    [x: string]: unknown;
  } | {
    [x: string]: unknown;
  }[] | undefined
  isSales: boolean
  price?: string
  listingId?: string
}

export function useNFTs() {
  const address = useAddress()
  const { contract: nft_contract } = useContract(ADDRESS.NFT_COLLECTION, 'nft-collection')
  const { contract: market_contract } = useContract(ADDRESS.MARKETPLACE, 'marketplace')
  const { data, isLoading: nftisloading } = useOwnedNFTs(nft_contract, address)
  const { data: salesdata, isLoading: salesisLoading } = useActiveListings(market_contract, { seller: address })

  const nft_list = data?.map(item => {
    const nft: ProfileNFT = {
      id: item.metadata.id,
      name: item.metadata.name as string,
      image: item.metadata.image as string,
      desc: item.metadata.description as string,
      props: item.metadata.properties,
      isSales: false
    }
    salesdata?.map(item_ => {
      if (item.metadata.id === item_.asset.id) {
        nft.isSales = true
        nft.price = item_.buyoutCurrencyValuePerToken.displayValue
        nft.listingId = item_.id
      }
    })
    return nft
  }).reverse()

  const isLoading = nftisloading || salesisLoading

  return { nft_list, isLoading }
}