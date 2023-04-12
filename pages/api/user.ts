import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '~/helper/redis'

interface UserRequestBody {
  id: string;
  avatarUrl?: string;
  username?: string;
}

function validateRequestBody(body: UserRequestBody) {
  if (!body.id) {
    throw new Error('Missing required field: id')
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req

  try {
    validateRequestBody(body)

    const userKey = `user:${body.id}`

    switch (method) {
      case 'GET': {
        let data = await redis.hgetall(userKey)
        if (!data) {
          const commands = redis.pipeline()
          commands.hset(userKey, { avatarUrl: '', username: '' })
          await commands.exec()
          data = await redis.hgetall(userKey)
        }
        return res.status(200).json({ data })
      }
      case 'PUT': {
        const commands = redis.pipeline()
        if (body.avatarUrl) {
          commands.hset(userKey, { avatarUrl: body.avatarUrl })
        }
        if (body.username) {
          commands.hset(userKey, { username: body.username })
        }
        await commands.exec()
        return res.status(200).json({ message: 'User updated' })
      }
      default: {
        return res.status(405).json({ message: 'Method not allowed' })
      }
    }
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message })
  }
}