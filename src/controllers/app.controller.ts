import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app/app.service';
import { AllExceptionFilter } from '../Filter/AllExceptionFilter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}