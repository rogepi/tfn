import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'

interface CartRequestBody {
  id: string;
  nftId?: string;
}

function validateRequestBody(body: CartRequestBody) {
  if (!body.id) {
    throw new Error('Missing required field: id')
  }
}

function validateNftId(nftId?: string) {
  if (!nftId) {
    throw new Error('Missing required field: nftId')
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  try {
    validateRequestBody(body)

    const cartKey = `cart:${body.id}`

    switch (method) {
      case 'GET': {
        const data = await redis.smembers(cartKey)
        return res.status(200).json({ data })
      }
      case 'POST': {
        validateNftId(body.nftId)
        const result = await redis.sadd(cartKey, body.nftId)
        if (result === 1) {
          return res.status(200).json({ message: 'Added to cart' })
        } else {
          return res.status(400).json({ message: 'Item already in cart' })
        }
      }
      case 'DELETE': {
        validateNftId(body.nftId)
        const result = await redis.srem(cartKey, body.nftId)
        if (result === 1) {
          return res.status(200).json({ message: 'Removed from cart' })
        } else {
          return res.status(404).json({ message: 'Item not found in cart' })
        }
      }
      default: {
        return res.status(405).json({ message: 'Method not allowed' })
      }
    }
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message })
  }
}