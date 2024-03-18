import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrescriptionController } from './prescription.controller';
import { Prescription, PrescriptionSchema } from './prescription.schema';
import { PrescriptionService } from './prescription.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Prescription.name, schema: PrescriptionSchema}])],
  controllers: [PrescriptionController],
  providers: [PrescriptionService]
})
export class PrescriptionModule {}
