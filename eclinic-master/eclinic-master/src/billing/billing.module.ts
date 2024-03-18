import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingController } from './billing.controller';
import { Billing, BillingSchema } from './billing.schema';
import { BillingService } from './billing.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Billing.name, schema: BillingSchema }])],
  controllers: [BillingController],
  providers: [BillingService]
})
export class BillingModule { }
