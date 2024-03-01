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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const authvm_1 = require("./../../models/viewmodel/auth/authvm");
const user_service_1 = require("./../user/user.service");
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signIn(data) {
        const res = new authvm_1.authvm();
        const user = await this.usersService.findOneValue({
            username: { $gte: data.username },
        });
        if (!user)
            throw new common_1.BadRequestException('Tài khoản không tồn tại!');
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches)
            throw new common_1.BadRequestException('Nhập sai mật khẩu!');
        const payload = { userId: 123, role: 'admin' };
        const secretKey = 'your-secret-key';
        const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
        console.log(token);
        res.message = 'Đăng nhập thành công';
        res.role = user.role;
        res.status = true;
        res.statuscode = 200;
        res.userid = user.id;
        res.username = user.username;
        res.accessToken = 'ầdasdfasdfasdfasdfasdfa4123123';
        return res;
    }
    async logout() { }
    hashData(data) {
        return argon2.hash(data);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map