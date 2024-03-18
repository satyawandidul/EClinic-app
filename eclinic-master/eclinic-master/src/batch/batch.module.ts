import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BatchController } from './batch.controller';
import { Batch, BatchSchema } from './batch.schema';
import { BatchService } from './batch.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Batch.name, schema: BatchSchema}])],
  controllers: [BatchController],
  providers: [BatchService]
})
export class BatchModule {}
