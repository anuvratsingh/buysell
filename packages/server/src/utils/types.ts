import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

export type Context = {
  req: Request & { session: Session & { userId: string } };
  res: Response;
  redis: Redis;
};

export class CategoryTypes {
  Cars: string;
  Electronics: string;
  Motorcycles: string;
}
