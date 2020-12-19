import { Item } from '../entity/Item';
import { User } from '../entity/User';
import { Connection, createConnection } from 'typeorm';

export const testConn = (drop = false): Promise<Connection> => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'buysell_test',
    synchronize: true,
    dropSchema: drop,
    entities: [User, Item],
  });
};
