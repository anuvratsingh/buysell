import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Item } from '../entity/Item';
import 'reflect-metadata'

@Resolver()
export class ItemResolver {
  @Query(() => String)
  helloItem(): string {
    return 'hello from Item';
  }

  @Query(() => [Item])
  async allItems(): Promise<Item[]> {
    return await Item.find();
  }

  @Mutation(() => Item)
  async addItem(
    @Arg('name') name: string,
    @Arg('category') category: 'Cars' | 'Motorbikes' | 'Others',
    @Arg('price') price: number
  ): Promise<Item> {
    const item = await Item.create({
      name: name,
      category: category,
      price: price,
    }).save();

    return item;
  }
}
