import { Module } from '@nestjs/common';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientVisits, VisitsSchema } from './visits.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: PatientVisits.name, schema: VisitsSchema}])],
  controllers: [VisitsController],
  providers: [VisitsService]
})
export class VisitsModule {}
