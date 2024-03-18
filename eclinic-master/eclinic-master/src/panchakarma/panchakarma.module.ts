import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PanchakarmaController } from './panchakarma.controller';
import { Panchakarma, PanchakarmaSchema } from './panchakarma.schema';
import { PanchakarmaService } from './panchakarma.service';

@Module({
  imports:  [MongooseModule.forFeature([{name: Panchakarma.name, schema: PanchakarmaSchema}])],
  controllers: [PanchakarmaController],
  providers: [PanchakarmaService]
})
export class PanchakarmaModule {}
