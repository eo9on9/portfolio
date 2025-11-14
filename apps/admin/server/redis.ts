import { createClient, type RedisClientType } from 'redis'

let client: RedisClientType | null = null

const PREFIX = 'admin:'

async function getRedis(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({
      url: process.env.REDIS_URL!,
    })
    await client.connect()
  }

  return client
}

async function redisGet(key: string) {
  return getRedis().then(client => client.get(PREFIX + key))
}

async function redisSet(key: string, value: string) {
  return getRedis().then(client => client.set(PREFIX + key, value))
}

export const redis = {
  get: redisGet,
  set: redisSet,
}
