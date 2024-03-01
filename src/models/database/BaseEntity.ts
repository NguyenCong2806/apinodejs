import { Prop } from '@nestjs/mongoose';

export class BaseEntity {
  @Prop()
  id: string;
  @Prop()
  createddate: Date;
}
