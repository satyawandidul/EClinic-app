import { Test, TestingModule } from '@nestjs/testing';
import { PanchakarmaBillingController } from './panchakarma-billing.controller';

describe('PanchakarmaBillingController', () => {
  let controller: PanchakarmaBillingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanchakarmaBillingController],
    }).compile();

    controller = module.get<PanchakarmaBillingController>(PanchakarmaBillingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
