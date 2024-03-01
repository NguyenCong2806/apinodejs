import { Prop } from '@nestjs/mongoose';

export class BaseEntity {
  @Prop()
  _id: string;
  @Prop()
  createddate: Date;
}
