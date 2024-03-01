import { IBaseRepository } from './IBaseRepository';
import { BaseEntity } from './../models/database/BaseEntity';
import Paginations from 'src/models/BaseModel/Paginations';
import Results from 'src/models/BaseModel/Results';
import { Model, FilterQuery } from 'mongoose';

export abstract class BaseRepository<T extends BaseEntity>
  implements IBaseRepository<T>
{
  protected constructor(private readonly _model: Model<T>) {
    this._model = _model;
  }
  async finds(item: Paginations<T>): Promise<Results<T>> {
    const result = new Results<T>();
    try {
      const counts = (await this._model.find()).length;
      result.pageIndex = item.perPage;
      result.totalCount = counts;
      result.totalPage = Math.ceil(counts / item.page);
      if (item.condition != null) {
        result.items = await this._model
          .find(item.condition)
          .skip(item.page * (item.perPage - 1))
          .limit(item.page)
          .sort({ createddate: -1 });
      } else {
        result.items = await this._model
          .find()
          .skip(item.page * (item.perPage - 1))
          .limit(item.page)
          .sort({ createddate: -1 });
      }
    } catch (error: any) {
      throw new Error(error.message);
    }

    return result;
  }

  async find(): Promise<T[]> {
    try {
      return await this._model.find();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findOne(id: any): Promise<T> {
    try {
      return (await this._model.findById(id)) as T;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async findOneValue(condition?: FilterQuery<T>): Promise<T> {
    try {
      return (await this._model.findOne(condition)) as T;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async create(item: T): Promise<boolean> {
    try {
      await this._model.insertMany(item);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async count(): Promise<number> {
    try {
      return (await this._model.find()).length;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async update(id: any, item: T): Promise<boolean> {
    try {
      return await this._model.findOneAndUpdate({ _id: id }, item, {
        new: true,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async delete(id: any): Promise<boolean> {
    try {
      const delete_item = await this._model.findById(id);
      if (!delete_item) {
        return false;
      }
      return !!(await this._model.findByIdAndDelete(id));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
