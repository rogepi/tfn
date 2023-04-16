import { AuctionListing, DirectListing, NFT } from '@thirdweb-dev/sdk'
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
})

export const getListingsByRedis = async (count?: number) => {
  const redisKey = 'listings'
  const listings = await redis.lrange(redisKey, 0, count !== undefined ? count : -1) as (AuctionListing | DirectListing)[]
  return listings
}

export const getNFTsByRedis = async (count?: number) => {
  const redisKey = 'nfts'
  const nfts = await redis.lrange(redisKey, 0, count !== undefined ? count : -1) as NFT[]
  return nfts
}