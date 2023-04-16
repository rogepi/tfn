import { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'
import { getNFTs, sdk } from '~/helper/sdk'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const nfts = await getNFTs()

  const redisKey = 'nfts'
  await redis.del(redisKey)
  await redis.lpush(redisKey, ...nfts)
  return res.status(200).json({
    nfts
  })
}

export default handler
