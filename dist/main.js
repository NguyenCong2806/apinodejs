"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(parseInt(process.env.PORT, 10) || 3000);
    console.log('server runing', `http://localhost:${parseInt(process.env.PORT, 10) || 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map