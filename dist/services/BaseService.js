"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async find() {
        return await this.repository.find();
    }
    async create(item) {
        return await this.repository.create(item);
    }
    async update(id, item) {
        return await this.repository.update(id, item);
    }
    async remove(id) {
        return await this.repository.delete(id);
    }
    async finds(item) {
        return await this.repository.finds(item);
    }
    async findOne(id) {
        return await this.repository.findOne(id);
    }
    async findOneValue(condition) {
        return await this.repository.findOneValue(condition);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.js.map