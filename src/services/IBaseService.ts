import { FilterQuery } from 'mongoose';
import Paginations from 'src/models/BaseModel/Paginations';
import Results from 'src/models/BaseModel/Results';

export interface Write<M> {
  create(item: M | any): Promise<boolean>;
  update(item: Partial<M>): Promise<boolean>;
  remove(id: string): Promise<boolean>;
}

export interface Read<M> {
  finds(item: Paginations<M>): Promise<Results<M>>;
  find(): Promise<Array<M>>;
  findOne(id: string): Promise<M>;
  findOneValue(condition?: FilterQuery<M>): Promise<M>;
}

export interface IBaseService<M> extends Write<M>, Read<M> {}
