import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { ToleranceModule } from './tolerance/tolerance.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './stock.schema';
//import { StockModule } from './stock/stock.module';


@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [ ToleranceModule, MongooseModule.forFeature([{name: Stock.name, schema: StockSchema}])],
})
export class StockModule { }