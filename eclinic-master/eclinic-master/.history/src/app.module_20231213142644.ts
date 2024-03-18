import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { ChargesModule } from './charges/charges.module';
import { PanchakarmaModule } from './panchakarma/panchakarma.module';
import { MedicineModule } from './medicine/medicine.module';
import { BatchModule } from './batch/batch.module';
import { PatientModule } from './patient/patient.module';
import { PulseModule } from './pulse/pulse.module';
import { SrotasModule } from './srotas/srotas.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { AppointmentModule } from './appointment/appointment.module';
import { BillingModule } from './billing/billing.module';
import { StockModule } from './stock/stock.module';
import { TreatmentModule } from './treatment/treatment.module';
import { PanchakarmaBillingModule } from './panchakarma-billing/panchakarma-billing.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.41/eClinic'),
    UsersModule,
    LocationsModule,
    ChargesModule,
    PanchakarmaModule,
    MedicineModule,
    BatchModule,
    PatientModule,
    PulseModule,
    SrotasModule,
    PrescriptionModule,
    AppointmentModule,
    BillingModule,
    StockModule,
    TreatmentModule,
    PanchakarmaBillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
