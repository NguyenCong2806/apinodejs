import { IBaseRepository } from './../repository/IBaseRepository';
import Paginations from 'src/models/BaseModel/Paginations';
import Results from 'src/models/BaseModel/Results';
import { BaseEntity } from './../models/database/BaseEntity';
import { IBaseService } from './IBaseService';
import { FilterQuery } from 'mongoose';

export abstract class BaseService<M extends BaseEntity>
  implements IBaseService<M>
{
  constructor(private readonly repository: IBaseRepository<M>) {}
  async find(): Promise<M[]> {
    return await this.repository.find();
  }
  async create(item: M | any): Promise<boolean> {
    return await this.repository.create(item);
  }
  async update(id: string, item: Partial<M>): Promise<boolean> {
    return await this.repository.update(id, item);
  }
  async remove(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
  async finds(item: Paginations): Promise<Results<M>> {
    return await this.repository.finds(item);
  }
  async findOne(id: string): Promise<M> {
    return await this.repository.findOne(id);
  }
  async findOneValue(condition?: FilterQuery<M>): Promise<M> {
    return await this.repository.findOneValue(condition);
  }
}
