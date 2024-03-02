/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { IBaseRepository } from './../repository/IBaseRepository';
import Paginations from 'src/models/BaseModel/Paginations';
import Results from 'src/models/BaseModel/Results';
import { BaseEntity } from './../models/database/BaseEntity';
import { IBaseService } from './IBaseService';
import { FilterQuery } from 'mongoose';
export declare abstract class BaseService<M extends BaseEntity> implements IBaseService<M> {
    private readonly repository;
    constructor(repository: IBaseRepository<M>);
    find(): Promise<M[]>;
    create(item: M | any): Promise<boolean>;
    update(item: Partial<M>): Promise<boolean>;
    remove(id: string): Promise<boolean>;
    finds(item: Paginations<M>): Promise<Results<M>>;
    findOne(id: string): Promise<M>;
    findOneValue(condition?: FilterQuery<M>): Promise<M>;
}
