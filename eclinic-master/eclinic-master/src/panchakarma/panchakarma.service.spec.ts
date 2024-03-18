import { Test, TestingModule } from '@nestjs/testing';
import { PanchakarmaService } from './panchakarma.service';

describe('PanchakarmaService', () => {
  let service: PanchakarmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PanchakarmaService],
    }).compile();

    service = module.get<PanchakarmaService>(PanchakarmaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
