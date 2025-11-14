import { createClient, type RedisClientType } from 'redis'

let client: RedisClientType | null = null

export async function getRedis(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL!,
    })
    await client.connect()
  }

  return client
}
