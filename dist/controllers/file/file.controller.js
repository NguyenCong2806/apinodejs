"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const multer = require("multer");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.FILE_ROOT);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
let UploadController = class UploadController {
    async getallfile(res) {
        const data = fs.readdirSync(process.env.FILE_ROOT, {
            withFileTypes: true,
        });
        res.status(200).json(data);
    }
    async deletefile(filename, res) {
        fs.unlinkSync(process.env.FILE_ROOT + '/' + filename);
        res.status(200).json('Xóa bỏ thành công file');
    }
    uploadFile(file, res) {
        console.log(file);
        res.status(common_1.HttpStatus.OK).json(true);
    }
    uploadMultiple(files, res) {
        res.status(common_1.HttpStatus.OK).json(true);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Get)('getallfile'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getallfile", null);
__decorate([
    (0, common_1.Get)('deletefile/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deletefile", null);
__decorate([
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: storage })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('files'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', parseInt(process.env.FILE_UP_COUNT), {
        storage: storage,
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadMultiple", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload')
], UploadController);
//# sourceMappingURL=file.controller.js.map