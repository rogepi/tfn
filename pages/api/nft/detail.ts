import { AuctionListing, DirectListing, NFT } from '@thirdweb-dev/sdk'
import { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'

export interface INFTwithPrice {
  nft: NFT
  price?: string
  listingId?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  const id = query.id as string
  const nfts = await redis.lrange('nfts', 0, -1) as NFT[]
  const listings = await redis.lrange('listings', 0, -1) as (AuctionListing | DirectListing)[]
  const nft = nfts.find(item => item.metadata.id === id) as NFT
  const isSales = listings.find(item => item.asset.id === nft.metadata.id)

  let _nft: INFTwithPrice = {} as INFTwithPrice
  _nft.nft = nft
  if (isSales) {
    _nft.price = isSales.buyoutCurrencyValuePerToken.displayValue
    _nft.listingId = isSales.id
  }
  return res.status(200).json({ data: _nft })
}

export default handler
