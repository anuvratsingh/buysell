import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';


@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  category!: 'Cars' | 'Motorbikes' | 'Others';

  @Field()
  @Column({ nullable: true }) //In dev
  subCategory: string;

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column('bool', { default: false })
  negotiable: boolean;

  @Field()
  @Column({ nullable: true }) //In dev
  email: string;

  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
