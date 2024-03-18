import { Test, TestingModule } from '@nestjs/testing';
import { SrotasService } from './srotas.service';

describe('SrotasService', () => {
  let service: SrotasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SrotasService],
    }).compile();

    service = module.get<SrotasService>(SrotasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
