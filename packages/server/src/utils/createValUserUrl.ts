import { v4 } from 'uuid';
import { redis } from './redis';
import { confirmUserPrefix } from './redisPrefixes';
export const createValUserUrl = async (userId: string): Promise<string> => {
  const token = v4();
  await redis.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24);

  return `http://localhost:3000/user/confirm/${token}`;
};
