import { Test, TestingModule } from '@nestjs/testing';
import { PanchakarmaBillingService } from './panchakarma-billing.service';

describe('PanchakarmaBillingService', () => {
  let service: PanchakarmaBillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PanchakarmaBillingService],
    }).compile();

    service = module.get<PanchakarmaBillingService>(PanchakarmaBillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
