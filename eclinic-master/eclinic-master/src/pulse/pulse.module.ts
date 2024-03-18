import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PulseController } from './pulse.controller';
import { Pulse, PulseSchema } from './pulse.schema';
import { PulseService } from './pulse.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Pulse.name, schema: PulseSchema}])],
  controllers: [PulseController],
  providers: [PulseService]
})
export class PulseModule {}
