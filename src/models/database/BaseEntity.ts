import { Prop } from '@nestjs/mongoose';

export class BaseEntity {
  @Prop()
  createddate: Date;
}
