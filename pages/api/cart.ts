import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'

interface CartRequestBody {
  cart: string[];
}

function validateId(id: string) {
  if (!id || id === 'undefined') {
    throw new Error('Missing required field: id')
  }
}

function validateRequestBody(body: CartRequestBody) {
  if (!body.cart) {
    throw new Error('Missing request body: cart')
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req
  const id = query.id as string

  try {
    validateId(id)
    const cartKey = `cart:${id}`

    switch (method) {
      case 'GET': {
        const data = await redis.lrange(cartKey, 0, -1)
        return res.status(200).json({ data })
      }
      case 'PUT': {
        validateRequestBody(body)
        const cart = body.cart || []
        await redis.del(cartKey)
        await redis.lpush(cartKey, ...cart)
        return res.status(200).json({ message: 'Cart updated' })
      }
      default: {
        return res.status(405).json({ message: 'Method not allowed' })
      }
    }
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message })
  }
}