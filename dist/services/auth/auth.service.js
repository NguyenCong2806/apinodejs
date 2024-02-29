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
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signIn(username, password) {
        const user = await this.usersService.findOneValue({
            username: { $gte: username },
        });
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        if (await bcrypt.compare(user.password, hash)) {
            throw new common_1.UnauthorizedException();
        }
        else {
            const accessToken = jsonwebtoken_1.default.sign({ _id: user.email, name: user.username }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const refreshToken = jsonwebtoken_1.default.sign({ _id: user.email, name: user.username }, process.env.JWT_SECRET_REFRESH, {
                expiresIn: process.env.JWT_EXPIRE_REFRESH,
            });
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map