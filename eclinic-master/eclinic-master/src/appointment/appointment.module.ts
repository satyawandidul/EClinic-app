import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentController } from './appointment.controller';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppointmentService } from './appointment.service';
import { VisitsModule } from 'src/patient/visits/visits.module';
import { PatientVisits, VisitsSchema } from 'src/patient/visits/visits.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PatientVisits.name, schema: VisitsSchema }]), MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }])],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule { }
