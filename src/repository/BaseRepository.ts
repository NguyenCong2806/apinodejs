import ResultData from 'src/models/BaseModel/ResultData';
import { IBaseRepository } from './IBaseRepository';
import { BaseEntity } from './../models/database/BaseEntity';
import Paginations from 'src/models/BaseModel/Paginations';
import Results from 'src/models/BaseModel/Results';
import { FilterQuery, Model } from 'mongoose';
import { message } from 'src/constants/message';
import { httpstatus } from 'src/constants/httpStatus';

export abstract class BaseRepository<T extends BaseEntity>
  implements IBaseRepository<T>
{
  protected constructor(private readonly _model: Model<T>) {
    this._model = _model;
  }
  async findcondition(condition?: FilterQuery<T>): Promise<ResultData> {
    const _data = new ResultData();
    try {
      _data.status = true;
      _data.message = message.Download_data_successfully;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = await this._model.find(condition);
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
    return _data;
  }
  async checkkeyword(condition?: FilterQuery<T>): Promise<ResultData> {
    const _data = new ResultData();
    try {
      const res = await this._model.find(condition);
      _data.status = true;
      _data.message =
        res != null ? message.NotExist_Message : message.Exist_Message;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = res != null ? false : true;
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
    return _data;
  }
  async countcondition(condition?: FilterQuery<T>): Promise<ResultData> {
    const _data = new ResultData();
    try {
      const num = (await this._model.find(condition)).length;
      _data.status = true;
      _data.message = message.Download_data_successfully;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = num;
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
    return _data;
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

  async find(): Promise<ResultData> {
    const _data = new ResultData();
    try {
      _data.status = true;
      _data.message = message.Download_data_successfully;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = await this._model.find();
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
    return _data;
  }

  async findOne(id: any): Promise<ResultData> {
    const _data = new ResultData();
    try {
      _data.status = true;
      _data.message = message.Download_data_successfully;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = (await this._model.findById(id).exec()) as T;
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
    return _data;
  }
  async findOneValue(condition?: FilterQuery<T>): Promise<ResultData> {
    const _data = new ResultData();
    try {
      _data.status = true;
      _data.message = message.Download_data_successfully;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = (await this._model.findOne(condition)) as T;
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
    return _data;
  }
  async create(item: T): Promise<ResultData> {
    const _data = new ResultData();
    try {
      await this._model.insertMany(item);
      _data.status = true;
      _data.message = message.Add_Successful;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = true;
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
    return _data;
  }
  async count(): Promise<ResultData> {
    const _data = new ResultData();
    try {
      const num = (await this._model.find()).length;
      _data.status = true;
      _data.message = message.Download_data_successfully;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = num;
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
    return _data;
  }
  async update(id: any, item: T): Promise<ResultData> {
    const _data = new ResultData();
    try {
      await this._model.findOneAndUpdate({ _id: id }, item);
      _data.status = true;
      _data.message = message.Edit_Successful;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = true;
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
    return _data;
  }
  async delete(id: any): Promise<ResultData> {
    const _data = new ResultData();
    try {
      const delete_item = await this._model.findById(id);
      if (delete_item) {
        await this._model.findByIdAndDelete(id);
      }
      _data.status = true;
      _data.message = message.Delete_Successful;
      _data.statuscode = httpstatus.Successful_responses;
      _data.item = true;
      return _data;
    } catch (error: any) {
      _data.status = false;
      _data.message = error.message as string;
      _data.statuscode = httpstatus.Server_errors;
      _data.item = false;
    }
  }
}
