import { FilterQuery } from 'mongoose';
import Paginations from 'src/models/BaseModel/Paginations';
import Results from 'src/models/BaseModel/Results';

export interface IBaseRepository<T> {
  finds(item: Paginations): Promise<Results<T>>;
  find(): Promise<Array<T>>;
  findOne(id: any): Promise<T>;
  findOneValue(condition?: FilterQuery<T>): Promise<T>;

  create(item: T): Promise<boolean>;
  count(): Promise<number>;
  update(id: any, item: Partial<T>): Promise<boolean>;
  delete(id: any): Promise<boolean>;
}
