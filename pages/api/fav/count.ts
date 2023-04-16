import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'

interface NftFavoriteCountResponseBody {
  nftId: string;
  count: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const { nftId } = query

  try {
    const favoriteKeys = await redis.keys(`favorite:*`)
    const pipeline = redis.pipeline()

    favoriteKeys.forEach((key) => {
      pipeline.sismember(key, nftId)
    })
    const results = await pipeline.exec()
    const count = results.filter((result: any) => result === 1).length
    const responseBody: NftFavoriteCountResponseBody = {
      nftId: nftId as string,
      count,
    }

    return res.status(200).json(responseBody)
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message })
  }
}