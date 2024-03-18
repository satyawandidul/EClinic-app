import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChargesController } from './charges.controller';
import { Charges, ChargesSchema } from './charges.schema';
import { ChargesService } from './charges.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Charges.name, schema: ChargesSchema }])],
  controllers: [ChargesController],
  providers: [ChargesService]
})
export class ChargesModule { }
