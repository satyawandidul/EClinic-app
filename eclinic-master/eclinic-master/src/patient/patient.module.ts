import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientController } from './patient.controller';
import { Patient, PatientSchema } from './patient.schema';
import { PatientService } from './patient.service';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Patient.name, schema: PatientSchema}]), VisitsModule],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}
