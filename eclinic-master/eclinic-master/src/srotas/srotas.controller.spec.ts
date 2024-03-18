import { Test, TestingModule } from '@nestjs/testing';
import { SrotasController } from './srotas.controller';

describe('SrotasController', () => {
  let controller: SrotasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrotasController],
    }).compile();

    controller = module.get<SrotasController>(SrotasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
