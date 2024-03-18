import { Test, TestingModule } from '@nestjs/testing';
import { PanchakarmaController } from './panchakarma.controller';

describe('PanchakarmaController', () => {
  let controller: PanchakarmaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanchakarmaController],
    }).compile();

    controller = module.get<PanchakarmaController>(PanchakarmaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
