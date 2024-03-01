import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from '../services/app/app.service';
import { AuthGuards } from 'src/Guard/AuthGuards';

@Controller()
@UseGuards(AuthGuards)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
