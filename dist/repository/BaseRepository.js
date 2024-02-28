"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const Results_1 = require("../models/BaseModel/Results");
class BaseRepository {
    constructor(_model) {
        this._model = _model;
        this._model = _model;
    }
    async finds(item) {
        const result = new Results_1.default();
        try {
            const counts = (await this._model.find()).length;
            result.pageIndex = item.perPage;
            result.totalCount = counts;
            result.totalPage = Math.round(counts / item.perPage);
            if (item.condition != null) {
                result.items = await this._model
                    .where(item.condition)
                    .skip(item.page * (item.perPage - 1))
                    .limit(item.perPage);
            }
            else {
                result.items = await this._model
                    .find()
                    .skip(item.page * (item.perPage - 1))
                    .limit(item.perPage);
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
        return result;
    }
    async find() {
        try {
            return await this._model.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findOne(id) {
        try {
            return (await this._model.findById(id));
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findOneValue(condition) {
        try {
            return (await this._model.findOne(condition));
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async create(item) {
        try {
            await this._model.insertMany(item);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async count() {
        try {
            return (await this._model.find()).length;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async update(id, item) {
        try {
            return await this._model.findOneAndUpdate({ _id: id }, item, {
                new: true,
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async delete(id) {
        try {
            const delete_item = await this._model.findById(id);
            if (!delete_item) {
                return false;
            }
            return !!(await this._model.findByIdAndDelete(id));
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map