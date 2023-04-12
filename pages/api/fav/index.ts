import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'

interface FavoriteRequestBody {
  userId: string;
  nftId?: string;
}

function validateRequestBody(body: FavoriteRequestBody) {
  if (!body.userId) {
    throw new Error('Missing required field: userId')
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  try {
    validateRequestBody(body)

    const favoriteKey = `favorite:${body.userId}`
    const nftId = body.nftId

    switch (method) {
      case 'GET': {
        const result = await redis.smembers(favoriteKey)
        return res.status(200).json({ data: result })
      }
      case 'POST': {
        const result = await redis.sadd(favoriteKey, nftId)
        return res.status(200).json({ message: 'NFT added to favorites' })
      }
      case 'DELETE': {
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