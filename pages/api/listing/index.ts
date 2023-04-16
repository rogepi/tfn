import { AuctionListing, DirectListing, } from '@thirdweb-dev/sdk'
import { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req

  switch (method) {
    case "GET": {
      const owner = query.owner as string
      const redisKey = 'listings'

      const listings = await redis.lrange(redisKey, 0, -1) as (AuctionListing | DirectListing)[]
      if (!owner) {
        return res.status(200).json({
          listings
        })
      } else {
        return res.status(200).json({
          listings: listings.filter(item => item.sellerAddress === owner)
        })
      }

    }

  }
}

export default handler
