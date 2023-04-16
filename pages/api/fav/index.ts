import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'

interface FavoriteRequestBody {
  nftId?: string;
}

function validateRequestBody(body: FavoriteRequestBody) {
  if (!body.nftId) {
    throw new Error('Missing required field: nftId')
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req

  const userId = query.userId as string
  if (!userId) {
    return res.status(400).json({ message: 'Missing required field: userId' })
  }
  try {

    const favoriteKey = `favorite:${userId}`
    const nftId = body.nftId

    switch (method) {
      case 'GET': {
        const result = await redis.smembers(favoriteKey)
        return res.status(200).json({ data: result })
      }
      case 'POST': {
        validateRequestBody(body)
        const result = await redis.sadd(favoriteKey, nftId)
        return res.status(200).json({ message: 'NFT added to favorites' })
      }
      case 'DELETE': {
        validateRequestBody(body)
        const result = await redis.srem(favoriteKey, nftId)
        return res.status(200).json({ message: 'NFT removed from favorites' })
      }
      default: {
        return res.status(405).json({ message: 'Method not allowed' })
      }
    }
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message })
  }
}