import { FilterQuery } from 'mongoose';

export default class Paginations<T> {
  perPage: number = 0;
  page: number = 10;
  keyword?: string = null;
  condition?: FilterQuery<T>;
  // value: string = null;
  // field: string = null;
}
