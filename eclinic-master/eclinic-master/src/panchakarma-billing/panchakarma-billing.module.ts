import { Module } from '@nestjs/common';
import { PanchakarmaBillingController } from './panchakarma-billing.controller';
import { PanchakarmaBillingService } from './panchakarma-billing.service';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  controllers: [PanchakarmaBillingController],
  providers: [PanchakarmaBillingService],
  imports: [TransactionsModule]
})
export class PanchakarmaBillingModule {}
