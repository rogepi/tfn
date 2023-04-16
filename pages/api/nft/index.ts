import { NFT } from '@thirdweb-dev/sdk'
import { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req

  switch (method) {
    case "GET": {
      const owner = query.owner as string
      const redisKey = 'nfts'

      const nfts = await redis.lrange(redisKey, 0, -1) as NFT[]
      if (!owner) {
        return res.status(200).json({
          nfts
        })
      } else {
        return res.status(200).json({
          nfts: nfts.filter(nft => nft.owner === owner)
        })
      }

    }

  }
}

export default handler
