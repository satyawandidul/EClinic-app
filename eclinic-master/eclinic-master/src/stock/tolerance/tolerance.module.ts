import { Module } from '@nestjs/common';
import { ToleranceController } from './tolerance.controller';
import { ToleranceService } from './tolerance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tolerance, ToleranceSchema } from './tolerance.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tolerance.name, schema: ToleranceSchema }])],
  controllers: [ToleranceController],
  providers: [ToleranceService]
})
export class ToleranceModule { }
