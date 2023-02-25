import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { ADDRESS } from "~/config/address"
import { INFT } from "./types"

export const sdk = new ThirdwebSDK('goerli')


interface getListingsParams {
  author?: string,
  count?: number
}

export const getListings = async ({ author, count }: getListingsParams) => {
  const market_contract = await sdk.getContract(ADDRESS.MARKETPLACE, "marketplace")
  const listings = await market_contract.getActiveListings({ seller: author, count })
  const data: INFT[] = listings.map(item => {
    return {
      id: item.id,
      tokenId: item.tokenId.toString(),
      image: item.asset.image,
      name: item.asset.name,
      price: item.buyoutCurrencyValuePerToken.displayValue
    }
  })
  return data.reverse()
}

export interface INFTDetail extends INFT {
  author: string
}

export const getListing = async (id: string): Promise<INFTDetail> => {
  const market_contract = await sdk.getContract(ADDRESS.MARKETPLACE, "marketplace")
  const listing = await market_contract.getListing(id)
  return {
    id: listing.id,
    tokenId: listing.tokenId.toString(),
    image: listing.asset.image,
    name: listing.asset.name,
    price: listing.buyoutCurrencyValuePerToken.displayValue,
    author: listing.sellerAddress
  }
}