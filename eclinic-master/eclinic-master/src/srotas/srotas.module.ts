import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SrotasController } from './srotas.controller';
import { Srotas, SrotasSchema } from './srotas.schema';
import { SrotasService } from './srotas.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Srotas.name, schema: SrotasSchema}])],
  controllers: [SrotasController],
  providers: [SrotasService]
})
export class SrotasModule {}
