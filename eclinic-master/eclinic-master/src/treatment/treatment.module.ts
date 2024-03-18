import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Treatment, TreatmentSchema } from './treatment.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Treatment.name, schema: TreatmentSchema}])],
  providers: [TreatmentService],
  controllers: [TreatmentController]
})
export class TreatmentModule {}
